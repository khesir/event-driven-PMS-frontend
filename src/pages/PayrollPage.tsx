import PageTittle from '@/components/PageTitle';
import { PayrollPageHeading } from '@/components/sections/PayrollPageHeading';
import { PayrollPageTable } from '@/components/sections/PayrollPageTable';
import PayrollDataProvider from '@/context/PayrollProvider';

export default function PayrollPage() {
  return (
    <div className='flex flex-col gap-5 w-full'>
      <PayrollDataProvider>
        <div className='flex w-full justify-between items-center'>
            <PageTittle title="Payroll"/>
            
          <PayrollPageHeading/>
        </div>
        <PayrollPageTable/>
      </PayrollDataProvider>
    </div>
  )
}
