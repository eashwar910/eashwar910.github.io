import { lazy, type ComponentType } from 'react';
import type { Section } from './route';
import About from './sections/About';
import Contact from './sections/Contact';
import Projects from './sections/Projects';
import RiceFallow from './sections/RiceFallow';
import Skills from './sections/Skills';
import Timeline from './sections/Timeline';

// The Lab (and its games) is its own lazy chunk.
const Lab = lazy(() => import('./sections/Lab'));

/** Every section's content, shared by the globe panel and the Show all page. */
export const PANELS: Record<Section, ComponentType> = {
  timeline: Timeline,
  'rice-fallow': RiceFallow,
  projects: Projects,
  about: About,
  lab: Lab,
  skills: Skills,
  contact: Contact,
};

export const LABELS: Record<Section, string> = {
  timeline: 'Timeline',
  'rice-fallow': 'Final-year project',
  projects: 'Projects',
  about: 'About',
  lab: 'Lab',
  skills: 'Skills and awards',
  contact: 'Contact',
};
