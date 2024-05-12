import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'

import PageTittle from '@/components/PageTitle'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Employee, LeaveRequest } from '@/lib/types'

import { getEmployeeById } from '@/controller/employee'
import { EditEmployeeDataDialog } from '@/components/dialog/EditEmployeeDataDialog'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/DataTable'

import { EmployeeUserDetail } from '@/components/sections/ViewEmployee/UserContent'
import { getAllLeaveRequest } from '@/controller/requestLeave'

  

export default function ViewEmployee(){
    const currentRun = useRef(false)
    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<Employee>();

    useEffect(()=>{
        if(currentRun.current === false){
            const fetchData = async () => {
                try {
                    const data = await getEmployeeById(id);
                    console.log(data)
                    setEmployee(data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            currentRun.current = true;
            fetchData()
        }
    })
    return(
        <div className='grid grid-cols-2 gap-5'>
            
            
             {/* Employee Details */}
            <div className='w-full h-full p-5 flex flex-col gap-3'>
                {employee && <EmployeeUserDetail emp={employee}/>}
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
                <AttendanceRecordTable/>
            </div>
            {/* Leave Data */}
            <div className='w-full h-full p-5`'>
                <LeaveDataTable/>
                
            </div>
            {/* Payslips */}
            <div className='w-full h-full p-5`'>
                <Payslips/>
            </div>
        </div>

    )
}


type LeaveRequestData = {
    id: String,
    comment: String,
    leaveType: String,
    start: String,
    end: String,
    status: String,
  }
  
  const columns: ColumnDef<LeaveRequestData>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },{
      accessorKey: "comment",
      header: "comment",
    },{
      accessorKey: "leaveType",
      header: "type",
    },{
      accessorKey: "start",
      header: "start",
    },{
      accessorKey: "end",
      header: "end",
    },{
      accessorKey: "status",
      header: "status",
    },
  ]

function AttendanceRecordTable(){
    
  const [LeaveRequests, setLeaveRequests] = useState<LeaveRequestData[]>([]);

  useEffect(() => {
    const getData = async () =>{
      try {
        const req = await getAllLeaveRequest();
        const newList : LeaveRequestData[] = req.map((leave : LeaveRequest ) =>{
          const {id, comment, leaveType, dateOfLeave,dateOfEnd,status} = leave
          

          return {
            id,
            comment,
            leaveType,
            dateOfLeave,
            dateOfEnd,
            status,
          }
        })
        setLeaveRequests(newList)
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  },[]);

    return(
        
      <div className='flex flex-col gap-5 w-full'>
        <PageTittle title="Attendance"/>
        <DataTable columns={columns} data={LeaveRequests}/>
        </div>

    )
}


function LeaveDataTable(){
    
    const [LeaveRequests, setLeaveRequests] = useState<LeaveRequestData[]>([]);
  
    useEffect(() => {
      const getData = async () =>{
        try {
          const req = await getAllLeaveRequest();
          const newList : LeaveRequestData[] = req.map((leave : LeaveRequest ) =>{
            const {id, comment, leaveType, dateOfLeave,dateOfEnd,status} = leave
            
  
            return {
              id,
              comment,
              leaveType,
              dateOfLeave,
              dateOfEnd,
              status,
            }
          })
          setLeaveRequests(newList)
        } catch (error) {
          console.log(error)
        }
      }
      getData();
    },[]);
  
      return(
          
        <div className='flex flex-col gap-5 w-full'>
          <PageTittle title="LeaveRequests"/>
          <DataTable columns={columns} data={LeaveRequests}/>
          </div>
  
      )
  }
function Payslips(){
    
    const [LeaveRequests, setLeaveRequests] = useState<LeaveRequestData[]>([]);
  
    useEffect(() => {
      const getData = async () =>{
        try {
          const req = await getAllLeaveRequest();
          const newList : LeaveRequestData[] = req.map((leave : LeaveRequest ) =>{
            const {id, comment, leaveType, dateOfLeave,dateOfEnd,status} = leave
            
  
            return {
              id,
              comment,
              leaveType,
              dateOfLeave,
              dateOfEnd,
              status,
            }
          })
          setLeaveRequests(newList)
        } catch (error) {
          console.log(error)
        }
      }
      getData();
    },[]);
  
      return(
          
        <div className='flex flex-col gap-5 w-full'>
          <PageTittle title="PaySlips"/>
          <DataTable columns={columns} data={LeaveRequests}/>
          </div>
  
      )
  }