import { describe, expect, it } from 'vitest';
import { profile } from './profile';
import { projects } from './projects';
import { skillGroups, awards } from './skills';
import { timeline } from './timeline';

const everything = JSON.stringify({ profile, projects, skillGroups, awards, timeline });

describe('content ground rules', () => {
  it('has no phone number', () => {
    expect(everything).not.toMatch(/\+?\d[\d\s().-]{8,}\d/);
    expect(everything.toLowerCase()).not.toContain('phone');
  });
  it('links only to my own GitHub repos and Kaggle datasets', () => {
    const hrefs = projects.flatMap((p) => p.links ?? []).map((l) => l.href);
    expect(hrefs).toContain('https://github.com/eashwar910/rice-fallow-radar');
    for (const h of hrefs)
      expect(h).toMatch(/^https:\/\/(github\.com\/eashwar910\/|www\.kaggle\.com\/datasets\/)/);
  });
  it('shows no results for Rice Fallow Radar', () => {
    const rfr = JSON.stringify(projects.find((p) => p.id === 'rice-fallow-radar'));
    expect(rfr).toContain('No results yet');
    expect(rfr).not.toMatch(/\d+(\.\d+)?\s*%\s*(accuracy|f1|rmse)/i);
  });
  it('does not name the seed research lecturer', () => {
    expect(JSON.stringify(timeline.find((t) => t.id === 'seed-research'))).not.toMatch(/Dr |Prof/);
  });
});
