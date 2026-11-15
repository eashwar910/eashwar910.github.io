import type { Section } from '../hub/route';

export interface Landmark {
  section: Section;
  name: string;
  lat: number;
  lon: number;
  /** Short label shown on hover, focus or when the marker nears the centre of the view. */
  label: string;
}

// Seven landmarks scattered over the globe, one per section (docs/HUB_REDESIGN.md section 3).
// Pairings are a proposal: change name/lat/lon/label here and nothing else needs touching.
export const landmarks: Landmark[] = [
  { section: 'timeline', name: 'Marina Beach, Chennai', lat: 13.05, lon: 80.28, label: 'Where it started' },
  { section: 'rice-fallow', name: 'Pyramids of Giza', lat: 29.979, lon: 31.134, label: 'Final-year project' },
  { section: 'projects', name: 'Genghis Khan Statue, Mongolia', lat: 47.81, lon: 107.53, label: 'Things I have built' },
  { section: 'about', name: 'Petronas Twin Towers, Kuala Lumpur', lat: 3.158, lon: 101.712, label: 'About me' },
  { section: 'lab', name: 'Colosseum, Rome', lat: 41.89, lon: 12.492, label: 'Play a game' },
  { section: 'skills', name: 'Moai, Easter Island', lat: -27.125, lon: -109.35, label: 'Skills and awards' },
  { section: 'contact', name: 'Christ the Redeemer, Rio de Janeiro', lat: -22.952, lon: -43.211, label: 'Say hello' },
];

export const landmarkFor = (s: Section) => landmarks.find((l) => l.section === s)!;
