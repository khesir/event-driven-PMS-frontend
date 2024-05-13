import { DataTable } from "@/components/DataTable";
import { AdjustmentData } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { useContext } from "react";
import { AdjustmentListDataContext } from "@/context/AdjustmentDataProvider";

  
  const columns: ColumnDef<AdjustmentData>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },{
      accessorKey: "category",
      header: "Category",
    },{
      accessorKey: "type",
      header: "Type",
    },{
      accessorKey: "name",
      header: "Name",
    },{
      accessorKey: "amount",
      header: "Amount",
    },{
      accessorKey: "remarks",
      header: "Remarks",
    }
  ]

export function AdjustmentListTables(){
    const {adjustments} = useContext(AdjustmentListDataContext)

    return(
        <div>
            <DataTable columns={columns} data={adjustments || []} />
        </div>
    )
}