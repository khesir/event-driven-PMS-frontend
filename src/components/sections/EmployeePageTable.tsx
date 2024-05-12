import { getAllEmployee } from "@/controller/employee";
import { useEffect, useRef, useState } from "react"
import { DataTable } from "../DataTable";
import { ColumnDef } from "@tanstack/react-table";

import { Employee } from "@/lib/types";

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SquarePen } from "lucide-react";


export type EmployeeTable = {
    id: number,
    name: string,
    department: string,
    designation: string,
    employeeType : string,
    status: string,
}
  
  const columns: ColumnDef<EmployeeTable>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },{
      accessorKey: "name",
      header: "Name",
    },{
      accessorKey: "department",
      header: "Department",
    },{
      accessorKey: "designation",
      header: "Designation",
    },{
      accessorKey: "employeeType",
      header: "EmployeeType",
    },{
      accessorKey: "status",
      header: "Status",
    },{
      header:"Actions",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const navigate = useNavigate();
        const viewData = (data : any)=>{
          const dataId = data.id
          navigate(`/admin/employee/${dataId}`)
      }
        return (
          <div className="flex">
            <Button variant="secondary" onClick={()=> {viewData(row.getVisibleCells().find((cell) => cell.row.original)?.row.original || "")}}><SquarePen /></Button>
            {/* <PayRollDialog row={row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""}/>
            <PayHeadDialog row={row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""}/>
            
            <DeleteEmployeeDialog row={row.getVisibleCells().find((cell) => cell.row.original)?.row.original || ""} options={1}/> */}
        </div>
        )
      },
    }
  ]

export function EmployeePageTable(){
    const currentRan = useRef(false)
    const [Employee, setEmployee] = useState<EmployeeTable[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    useEffect(()=>{
      if(currentRan.current === false){
          currentRan.current = true
          getData()
      }
    },[])
    const getData = async () =>{
      try {
        const data : any  = await getAllEmployee();
        if (data){
          const newList: EmployeeTable[] = data.map((employee: Employee) => {
            const { id, empNum, employeeData, department, designation, employeeType, createdAt, status} = employee;
          
            const { firstname, middlename, lastname, email, contact, gender } = employeeData;
            const name = `${firstname} ${middlename} ${lastname}`;
            
            return {
              id,
              name,
              department: department.name,
              designation: designation.designationName,
              employeeType,
              status,
            }
          });
            setEmployee(newList);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    return(
        <div>
            {isLoading ? (
            <div>Loading...</div>
            ) : (
            <DataTable columns={columns} data={Employee} />
            )}
        </div>
    )
}