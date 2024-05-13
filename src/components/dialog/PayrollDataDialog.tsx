import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import PayrollDetailsDataProvider from "@/context/PayrollDataProvider";
import { DialogDescription } from "@radix-ui/react-dialog";

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";

import { SquarePen } from "lucide-react";
import { PayDataCard } from "../sections/PayrollData/PayrollDataCard";
import { AdjustmentForm } from "../forms/AdjustmentForm";
import AdjustmentListDataProvider from "@/context/AdjustmentDataProvider";
import { AdjustmentListTables } from "../sections/PayrollData/AdjustmentListTables";
import { useParams } from "react-router-dom";



export function PayrollDataDialog({row}: any){
    const { id } = useParams<{ id: string }>()

    const fullname = row.employeeData.lastname + ", " + row.employeeData.firstname;
    return(
        <PayrollDetailsDataProvider empData={row}>
            <TooltipProvider>
                <Dialog>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                                <Button variant={"outline"} size={"icon"} className="h-[40px] w-full p-3">
                                <SquarePen />
                                </Button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent  side="top" className=" bg-current p-2 px-4 rounded-md m-1">
                            <span className="ml-auto text-primary-foreground">Adjustments</span>
                        </TooltipContent>
                    </Tooltip>
                    <DialogContent className="sm:max-w-7xl">
                        <DialogHeader>
                            <DialogTitle>Adjustments | {fullname}</DialogTitle>
                            <DialogDescription>All Data presents here will be rendered in the pay release</DialogDescription>
                        </DialogHeader>

                        <AdjustmentListDataProvider employeeId={row.id} payrollId={Number(id) ||undefined}>
                            <div className="grid grid-cols-3">
                                {/* Adjustment Form */}
                                <div className=" col-span-2">
                                    <AdjustmentForm/>
                                </div>
                                {/* Payroll Data form */}
                                <PayDataCard/>
                            </div>
                            <div className="w-full h-full p-5">
                                {/* Adjustment data fetch using */}
                                {/* Data Table for all data that is adjusted, started with empty for each Employee*/}
                                <AdjustmentListTables/>
                            </div>
                        </AdjustmentListDataProvider>
                        
                    </DialogContent>
                </Dialog>
            </TooltipProvider>
        </PayrollDetailsDataProvider>
    )
}
