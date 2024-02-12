import dynamic from 'next/dynamic';
const DynamicTasks = dynamic(() => import('../components/TaskTable'), {
  ssr: false,
});

export default function Tasks() {
  return (
    <div>
      <h1>./Tasks</h1>
      <DynamicTasks />
    </div>
  );
}
