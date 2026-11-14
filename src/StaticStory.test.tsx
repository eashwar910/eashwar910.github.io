import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { chapters } from './content/story';
import StaticStory from './StaticStory';

describe('StaticStory (reduced-motion / no-WebGL path)', () => {
  it('renders every caption line as real text, plus the skip link', () => {
    const html = renderToStaticMarkup(<StaticStory reason="reduced-motion" />);
    for (const line of chapters.flatMap((c) => c.lines)) {
      expect(html).toContain(line.replace(/'/g, '&#x27;'));
    }
    expect(html).toContain('href="#/timeline"');
  });

  it('never shows a phone number or results claims', () => {
    const copy = JSON.stringify(chapters);
    expect(copy).not.toMatch(/\+?\d[\d\s-]{8,}\d/);
    expect(copy).toContain('No results yet');
  });
});
