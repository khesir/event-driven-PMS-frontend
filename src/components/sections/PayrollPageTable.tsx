import { useContext, useEffect, useRef, useState } from "react"
import { DataTable } from "../DataTable";
import { ColumnDef } from "@tanstack/react-table";

import { Payroll } from "@/lib/types";

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SquarePen } from "lucide-react";
import { PayrollContext } from "@/context/PayrollProvider";
import { getAllPayRoll } from "@/controller/payroll";


  
  const columns: ColumnDef<Payroll>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },{
      accessorKey: "start",
      header: "Start",
    },{
      accessorKey: "end",
      header: "End",
    },{
      accessorKey: "payrollDate",
      header: "Payroll",
    },{
      accessorKey: "payrollFrequency",
      header: "EmployeeType",
    },{
      accessorKey: "signatory.name",
      header: "Signatory",
    },{
      header:"Actions",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const navigate = useNavigate();
        const viewData = (data : any)=>{
          const dataId = data.id
          navigate(`/admin/payroll/${dataId}`)
      }
        return (
          <div className="flex">
            <Button variant="secondary" onClick={()=> {viewData(row.getVisibleCells().find((cell) => cell.row.original)?.row.original || "")}}><SquarePen /></Button>

        </div>
        )
      },
    }
  ]

export function PayrollPageTable(){
    const currentRan = useRef(false)
    const [payrollData, setPayrollData] = useState<Payroll[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const {payroll} = useContext(PayrollContext)
    useEffect(() => {
      getData()
    },[payroll])
    useEffect(()=>{
      if(currentRan.current === false){
          currentRan.current = true
          getData()
      }
    },[])

    const getData = async () =>{
      try {
        const data = await getAllPayRoll();
        console.log(data)
        setPayrollData(data)
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
            <DataTable columns={columns} data={payrollData} />
            )}
        </div>
    )
}