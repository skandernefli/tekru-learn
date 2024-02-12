import dynamic from 'next/dynamic';
const DynamicProjects = dynamic(() => import('../components/ProjectTable'), {
  ssr: false,
});

export default function Projects() {
  return (
    <div>
      <h1>./Projects</h1>
      <DynamicProjects />
    </div>
  );
}
