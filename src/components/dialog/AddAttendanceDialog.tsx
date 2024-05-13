import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { AttendanceForm } from "../forms/AttendanceForm";

export function AddAttendanceDialog(){
    
    return(
        <Dialog >

            <DialogTrigger asChild>
                <Button variant={'default'}>Add Attendance</Button>
            </DialogTrigger>
                
            <DialogContent className=" xl:max-w-lg lg:max-w-lg ">
                <DialogHeader>
                    <DialogTitle>Attendance Form</DialogTitle>    
                </DialogHeader>
                <AttendanceForm/>
            </DialogContent>
        </Dialog>

    )
}
