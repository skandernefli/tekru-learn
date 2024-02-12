import dynamic from 'next/dynamic';
const DynamicEmployees = dynamic(() => import('../components/EmployeeTable'), {
  ssr: false,
});

export default function Employees() {
  return (
    <div>
      <h1>./Employees</h1>
      <DynamicEmployees />
    </div>
  );
}
