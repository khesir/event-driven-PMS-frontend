
import { AddEmployeeDataForm } from "../forms/AddEmployeeDataForm";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";


export function AddNewEmployeeDialog(){

    return (
        <TooltipProvider>
            <Dialog >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button variant={'default'}>Register New Employee</Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="top" className=" bg-current p-2 px-4 rounded-md m-1">
                        <span className="ml-auto text-primary-foreground">Add as Employee</span>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className="xl:max-w-5xl lg:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Register New Employee</DialogTitle>    
                    </DialogHeader>
                    <AddEmployeeDataForm/>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    )
}