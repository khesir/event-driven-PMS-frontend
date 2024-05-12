import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddUserForm } from "../forms/AddUserForm"
import { Employee } from "@/lib/types"

type Props = {
    employee : Employee
}

export function AddUserDialog({employee} : Props){

    return(

        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="h-[40px] w-full p-3">
                    Create User
                </Button>
            </DialogTrigger>
             
            <DialogContent className="xl:max-w-3xl lg:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Register User</DialogTitle>
                </DialogHeader>
                <AddUserForm empData = { employee }/>
            </DialogContent>
        </Dialog>

    )
}
