import 'cesium/Build/Cesium/Widgets/widgets.css';
import {
  Cartesian3,
  Ion,
  ImageryLayer,
  Math as CesiumMath,
  SceneTransforms,
  TileMapServiceImageryProvider,
  Viewer,
  buildModuleUrl,
} from 'cesium';
import type { GlobeEngine } from './GlobeEngine';

export function createCesiumEngine(container: HTMLElement): GlobeEngine {
  const token = import.meta.env.VITE_CESIUM_ION_TOKEN as string | undefined;
  let baseLayer: ImageryLayer;
  if (token) {
    Ion.defaultAccessToken = token;
    baseLayer = ImageryLayer.fromWorldImagery({});
  } else {
    // No token: bundled low-res Natural Earth so scroll and camera still work. See README.
    console.warn('VITE_CESIUM_ION_TOKEN is not set. Using low-resolution offline imagery.');
    baseLayer = ImageryLayer.fromProviderAsync(
      TileMapServiceImageryProvider.fromUrl(buildModuleUrl('Assets/Textures/NaturalEarthII')),
    );
  }

  const viewer = new Viewer(container, {
    baseLayer,
    animation: false,
    timeline: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    fullscreenButton: false,
    navigationHelpButton: false,
    sceneModePicker: false,
    infoBox: false,
    selectionIndicator: false,
    requestRenderMode: true,
    maximumRenderTimeChange: Infinity,
  });
  viewer.scene.screenSpaceCameraController.enableInputs = false; // scroll is the only driver until explore mode
  viewer.scene.globe.showGroundAtmosphere = true;

  // Ready = tiles started loading after our first camera move, then the queue drained.
  let started = false;
  let sawLoading = false;
  const ready = new Promise<void>((resolve) => {
    viewer.scene.globe.tileLoadProgressEvent.addEventListener((remaining) => {
      if (!started) return;
      if (remaining > 0) sawLoading = true;
      else if (sawLoading) resolve();
    });
  });

  return {
    whenReady: () => ready,
    project(lon, lat) {
      const world = Cartesian3.fromDegrees(lon, lat);
      // Horizon test: a surface point faces the camera when camera . point >= |point|^2.
      if (Cartesian3.dot(viewer.camera.positionWC, world) < Cartesian3.dot(world, world)) return null;
      const p = SceneTransforms.worldToWindowCoordinates(viewer.scene, world);
      return p ? { x: p.x, y: p.y } : null;
    },
    getCamera() {
      const c = viewer.camera.positionCartographic;
      return {
        lon: CesiumMath.toDegrees(c.longitude),
        lat: CesiumMath.toDegrees(c.latitude),
        height: c.height,
        heading: CesiumMath.toDegrees(viewer.camera.heading),
        pitch: CesiumMath.toDegrees(viewer.camera.pitch),
      };
    },
    setInputs(on, minHeight, maxHeight) {
      const c = viewer.scene.screenSpaceCameraController;
      c.enableInputs = on;
      c.enableRotate = c.enableZoom = on;
      c.enableTilt = c.enableLook = c.enableTranslate = false; // no tilting below the horizon
      // Cesium enforces these every frame even with inputs off, so clear them or the descent can't get below minHeight.
      c.minimumZoomDistance = on ? minHeight : 1;
      c.maximumZoomDistance = on ? maxHeight : Infinity;
    },
    rotate(deg) {
      viewer.camera.rotate(Cartesian3.UNIT_Z, CesiumMath.toRadians(deg));
    },
    render: () => viewer.scene.requestRender(),
    setCamera({ lon, lat, height, heading, pitch }) {
      viewer.camera.setView({
        destination: Cartesian3.fromDegrees(lon, lat, height),
        orientation: {
          heading: CesiumMath.toRadians(heading),
          pitch: CesiumMath.toRadians(pitch),
          roll: 0,
        },
      });
      started = true;
      viewer.scene.requestRender();
    },
    setLowPower(on) {
      viewer.resolutionScale = on ? 0.75 : 1;
      viewer.scene.globe.maximumScreenSpaceError = on ? 3 : 2;
      viewer.scene.requestRender();
    },
    destroy: () => viewer.destroy(),
  };
}
