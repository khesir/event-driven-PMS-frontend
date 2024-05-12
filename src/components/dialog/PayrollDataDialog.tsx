import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";

import { SquarePen } from "lucide-react";



export function PayrollDataDialog({row}: any){
    console.log(row)
    return(
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
                        <DialogTitle>Adjustments</DialogTitle>
                    </DialogHeader>
                   
                    
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}
