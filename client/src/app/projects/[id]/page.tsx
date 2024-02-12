import dynamic from 'next/dynamic';
const DynamicProjects = dynamic(() => import('../../components/ProjectTasksTable'), {
  ssr: false,
});

export default function ProjectTasks({params}) {
  return (
    <div >
      <h1>./Tasks</h1>
      <DynamicProjects  id={params.id} />
    </div>
  );
}
