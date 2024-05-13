
import {
  Banknote,
  Bell,
  Play,
  StopCircle,
  } from "lucide-react"
import { Nav } from './ui/nav'
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Separator } from "./ui/separator"
import { useContext } from "react"
import { EmployeeDataContext } from "@/context/EmployeeProvider"
import PayrollDataProvider, { PayrollContext } from "@/context/PayrollProvider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { UpdateEmployee } from "@/controller/employee"
import { AttendanceForm } from "./forms/AttendanceForm"
import { Employee } from "@/lib/types"

type Props = {
  layout : any
}

export default function EmployeeSideBar({layout}: Props) {
  const {employee} = useContext(EmployeeDataContext)
  
  return (

      <div className='hidden border-r bg-muted/40 md:block h-full'>
        <div className="flex h-full max-h-screen flex-col gap-2 w-[300px]">
          <TitleBar/>
          <div className="flex flex-col justify-between h-full gap-5">
            <AttendanceControl/>
            <div className="flex-1">
              {/* User Profile */}
              <Nav
                  links={layout}
                />
            </div>
          </div>
        </div>
      </div>
  )
}
function AttendanceControl(){
  const {employee,setEmployee} = useContext(EmployeeDataContext)

  const handleOnclick = async () =>{
    let status = ""
    if (employee?.status == "OFFLINE" || employee?.status != "REGULAR"){
      status = "REGULAR"
    } else{
      status = "ON_BREAK"
    }
    try {
      const data = {
        ...employee,
        status: status
      }
      // Change employee Data
      setEmployee(await UpdateEmployee(data,employee?.id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleOffline = async () =>{
    try {
      const data = {
        ...employee,
        status: "OFFLINE"
      }
      // Change employee Data
      setEmployee(await UpdateEmployee(data,employee?.id))
    } catch (error) {
      console.log(error)
    }
  }
  
  return(
    <Card className="mx-3">
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>
          Attendance
        </CardTitle>
        <CardDescription>
          Hours Rendered:  <br/>
          Status: {employee?.status}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-around gap-5">
        <Button className="w-full" onClick={handleOnclick}><Play/></Button>
        <Button variant={"destructive"} className="w-full" onClick={handleOffline}><StopCircle/></Button>
      </CardContent>
    </Card>
  )
}

function TitleBar(){
  return(
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Banknote className="h-6 w-6" />
          <span className="">EDP</span>
        </Link>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
    </div>

  )
}