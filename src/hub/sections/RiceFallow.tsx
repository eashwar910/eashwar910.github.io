import { projects } from '../../content/projects';
import Panel from '../Panel';
import ProjectCard from './ProjectCard';

const rfr = projects.find((p) => p.id === 'rice-fallow-radar')!;

export default function RiceFallow() {
  return (
    <Panel kicker="Final-year project" title={rfr.name}>
      <ProjectCard p={{ ...rfr, name: 'The project', context: undefined }} />
    </Panel>
  );
}
