import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'

import PageTittle from '@/components/PageTitle'
import { useContext, useEffect } from 'react'

import { EditEmployeeDataDialog } from '@/components/dialog/EditEmployeeDataDialog'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/DataTable'

import { EmployeeDataContext } from '@/context/EmployeeProvider'
import AssignTimeKeepingDataProvider, { AssignTimeKeepingDataContext } from '@/context/AttendanceDataProvider'
import { Button } from '@/components/ui/button'
import { AddAttendanceDialog } from '@/components/dialog/AddAttendanceDialog'
import { PayrollContext } from '@/context/PayrollProvider'
import { AssignTimeKeeping } from '@/lib/types'

  

export default function AttendancePage(){
    const {employee} = useContext(EmployeeDataContext)
    const {payroll} = useContext(PayrollContext)
    return(
        <div className='grid grid-cols-2 gap-5'>
            
            
             {/* Employee Details */}
            <div className='w-full h-full p-5 flex flex-col gap-3'>
                <div className='w-full flex flex-col gap-5'>
                    <div className='font-bold w-full flex justify-between'>
                        <PageTittle title='Employee'/>
                        {employee && (
                            <EditEmployeeDataDialog data={employee}/>
                        )}
                    </div>
                    <Card className='w-full'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        Category
                                    </TableHead>
                                    <TableHead>
                                        Value
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        ID
                                    </TableCell>
                                    <TableCell>
                                        {employee?.employeeData.id}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Fullname
                                    </TableCell>
                                    <TableCell>
                                    {`${employee?.employeeData.lastname}, ${employee?.employeeData.firstname} ${employee?.employeeData.middlename}`}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Status
                                    </TableCell>
                                    <TableCell>
                                        {employee?.status}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Designation
                                    </TableCell>
                                    <TableCell>
                                        {employee?.designation.designationName}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Department
                                    </TableCell>
                                    <TableCell>
                                        {employee?.department.name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                       Hourly Rate
                                    </TableCell>
                                    <TableCell>
                                        {employee?.hourlyRate}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                       Bank Account Number
                                    </TableCell>
                                    <TableCell>
                                        {employee?.bankAccountDetails}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                       PhilHeath ID
                                    </TableCell>
                                    <TableCell>
                                        {employee?.philhealth}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                       Social Security
                                    </TableCell>
                                    <TableCell>
                                        {employee?.socialSecurity}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                       TIN #
                                    </TableCell>
                                    <TableCell>
                                        {employee?.taxIdentification}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Contact
                                    </TableCell>
                                    <TableCell>
                                        {employee?.employeeData.contact}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Email
                                    </TableCell>
                                    <TableCell>
                                    {employee?.employeeData.email}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        BOD
                                    </TableCell>
                                    <TableCell>
                                        {employee?.employeeData.birthday}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Full Address
                                    </TableCell>
                                    <TableCell>
                                    {`${employee?.employeeData.barangay}, ${employee?.employeeData.addressLine}, ${employee?.employeeData.province}, ${employee?.employeeData.country}`}
                                    </TableCell>
                                </TableRow>
                            </TableBody>

                        </Table>   
                    </Card>
                </div>
            </div>
            {/* Attendance Data */}
            <div className='w-full h-full p-5'> 
                {/* Rollbase View */}
                {/* Employee Leave Requests Form */}
                <AssignTimeKeepingDataProvider employeeId={employee?.id} payrollId={payroll?.id}>
                    <AttendanceRecordTable/>
                </AssignTimeKeepingDataProvider>
            </div>
        </div>

    )
}



  
  const columns: ColumnDef<AssignTimeKeeping>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },{
      accessorKey: "hoursWorked",
      header: "Total Hours",
    },{
      accessorKey: "type",
      header: "Type",
    },{
      accessorKey: "workDate",
      header: "WorkDate",
    }
  ]

function AttendanceRecordTable(){
   const {assignTimeKeeping} = useContext(AssignTimeKeepingDataContext)

    return(
        
      <div className='flex flex-col gap-5 w-full'>
        <div className='flex justify-between'>
        <PageTittle title="Attendance"/>
        <AddAttendanceDialog/>
        </div>
        <DataTable columns={columns} data={assignTimeKeeping ?? []}/>
      </div>

    )
}

