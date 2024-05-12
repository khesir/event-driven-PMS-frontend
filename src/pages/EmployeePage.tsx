import PageTittle from '@/components/PageTitle';
import { EmployeePageHeading } from '@/components/sections/EmployeePageHeading';
import { EmployeePageTable } from '@/components/sections/EmployeePageTable';

export default function EmployeePage() {
  return (
    <div className='flex flex-col gap-5 w-full'>
      <div className='flex w-full justify-between items-center'>
          <PageTittle title="Employees"/>
          
          <EmployeePageHeading/>
      </div>
      <EmployeePageTable/>
    </div>
  )
}
