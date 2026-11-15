import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { landmarks } from '../content/landmarks';
import { timeline } from '../content/timeline';
import ShowAll from './ShowAll';
import { LABELS } from './sections';
import { SECTIONS } from './route';

describe('Show all (the accessible path)', () => {
  const html = renderToStaticMarkup(<ShowAll section={null} engine={null} />);

  it('has one h1 and a real-text section for every landmark', () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    for (const s of SECTIONS) expect(html).toContain(`id="${s}"`);
    for (const s of SECTIONS) expect(html).toContain(LABELS[s]);
    expect(landmarks).toHaveLength(SECTIONS.length);
  });

  it('reads from the same content files as the globe panels', () => {
    for (const t of timeline) expect(html).toContain(t.title.replace(/'/g, '&#x27;'));
    expect(html).toContain('Rice Fallow Radar');
    expect(html).toContain('Farmer Buddy');
  });

  it('shows no Rice Fallow Radar results and no phone number', () => {
    expect(html).toContain('No results yet');
    expect(html).not.toMatch(/\+?\d[\d\s().-]{8,}\d/);
  });
});
