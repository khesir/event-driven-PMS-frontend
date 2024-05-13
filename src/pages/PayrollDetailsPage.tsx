
import { DataTable } from '@/components/DataTable'
import { PayrollDataDialog } from '@/components/dialog/PayrollDataDialog'
import PageTittle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import PayrollDetailsProvider, { PayrollEmployeeListContext } from '@/context/PayrollDetailsProvider'
import PayrollDataProvider, { PayrollContext } from '@/context/PayrollProvider'
import {  getPayrollByID } from '@/controller/payroll'
import { createPaySlip } from '@/controller/payslip'
import {  Employee, Payroll, Payslip } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { useContext, useEffect,  } from 'react'
import {  useParams } from 'react-router-dom'

const EmployeeADD: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },{
    accessorKey: "employeeData.firstname",
    header: "Firstname",
  },{
    accessorKey: "employeeData.lastname",
    header: "Lastname",
  },{
    accessorKey: "department.name",
    header: "Department",
  },{
    accessorKey: "designation.designationName",
    header: "Designation",
  },{
    accessorKey: "employeeType",
    header: "EmployeeType",
  },{
    header:"Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const {addEmployeeToPayroll} = useContext(PayrollEmployeeListContext)
      const viewData = (data : any)=>{
        addEmployeeToPayroll(data)
    }
      return (
        <div className="flex">
          <Button variant="default" onClick={()=> {viewData(row.getVisibleCells().find((cell) => cell.row.original)?.row.original || "")}}>Add</Button>
          {/* <PayRollDialog row={row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""}/>
          <PayHeadDialog row={row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""}/>
          
          <DeleteEmployeeDialog row={row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""} options={1}/> */}
      </div>
      )
    },
  }
]
const EmployeeRemove: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },{
    accessorKey: "employeeData.firstname",
    header: "Firstname",
  },{
    accessorKey: "employeeData.lastname",
    header: "Lastname",
  },{
    accessorKey: "department.name",
    header: "Department",
  },{
    accessorKey: "designation.designationName",
    header: "Designation",
  },{
    accessorKey: "employeeType",
    header: "EmployeeType",
  },{
    header:"Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const {removeEmployeeFromPayroll} = useContext(PayrollEmployeeListContext)
      const viewData = (data : any)=>{
         removeEmployeeFromPayroll(data)
      }
      return (
        <div className="flex gap-3">
          <PayrollDataDialog row={row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""}/>
          
          <Button variant="destructive" onClick={()=> {viewData(row.getVisibleCells().find((cell) => cell.row.original)?.row.original || "")}}>Remove</Button>
      </div>
      )
    },
  }
]

export default function PayrollDetailPage() {

  
  return (

      <div className='flex flex-col gap-5 w-full py-3'>
        <PayrollDataProvider>
          <PayrollHeading/>
          <PayrollData/>
        </PayrollDataProvider>
      </div>

  )
}

function PayrollHeading(){
  const {payroll} = useContext(PayrollContext)

  const handleData = async() => {
    payroll?.employee.map(async emp => {
      const data = {
        payroll: payroll,
        total_earnings: Math.random() * 1000,
        total_deductions:  Math.random() * 1000,
        net_pay: Math.random() * 1000,
      }
      await createPaySlip(data)
    })
  }
  return(
    <div className='flex justify-between'>
      <PageTittle title="Payroll Information"/>
      <Button onClick={handleData}>Generate Payslips</Button>
    </div>
  )
}
function PayrollData(){
  const {payroll,setPayroll} = useContext(PayrollContext)
  
  const { id } = useParams<{ id: string }>();

  useEffect(() =>{
    fetchData()
  },[id])
  
  const fetchData =async () =>{
    try {
      const data : Payroll = await getPayrollByID(id);
      console.log(data)
      setPayroll(data)
    } catch (error){
      console.log(error)
    }
  }
  return(
    <>
      <Card className='grid grid-cols-2 w-full h-full max-h-[450px]'>
          <div className=' border-b col-span-2'>
            <Table>
            <TableBody>
              <TableRow>
                <TableCell>Payroll ID</TableCell>
                <TableCell>{payroll?.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Signatory</TableCell>
                <TableCell>{payroll?.signatory?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Payroll Frequeny</TableCell>
                <TableCell>{payroll?.payrollFrequency}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Payroll End</TableCell>
                <TableCell>{payroll?.payrollDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Start</TableCell>
                <TableCell>{payroll?.start}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>End</TableCell>
                <TableCell>{payroll?.end}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>{payroll?.status}</TableCell>
              </TableRow>
             
            </TableBody>
          </Table>
          </div>
        </Card>

          <div className='grid grid-cols-2 gap-5'>
            <PayrollDetailsProvider payrollId={payroll?.id ?? 0}>
              <AvailableEmployee/>
              <EmployeeInPayroll/>
            </PayrollDetailsProvider>
            
          </div>
    </>
  )
}

function EmployeeInPayroll(){
  const {employeeInPayroll} = useContext(PayrollEmployeeListContext)
  return(
    <div className='flex flex-col gap-5'>
      <PageTittle title='Employee In Payroll'/>
      <DataTable columns={EmployeeRemove} data={employeeInPayroll ?? []} />
    </div>
  )
}

function AvailableEmployee(){
  const {availableEmployee} = useContext(PayrollEmployeeListContext)
  return(
    <div className='flex flex-col gap-5'>
      <PageTittle title='Available Employee'/>
      <DataTable columns={EmployeeADD} data={availableEmployee ?? []} />
    </div>
  )
}