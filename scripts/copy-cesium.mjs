// Cesium loads workers and textures at runtime from CESIUM_BASE_URL (/cesium/). Copy them into public/.
import { cpSync, rmSync } from 'node:fs';

const from = 'node_modules/cesium/Build/Cesium';
rmSync('public/cesium', { recursive: true, force: true });
for (const dir of ['Assets', 'Workers', 'ThirdParty']) cpSync(`${from}/${dir}`, `public/cesium/${dir}`, { recursive: true });
