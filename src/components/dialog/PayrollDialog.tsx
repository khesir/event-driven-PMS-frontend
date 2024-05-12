import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PayrollForm } from "../forms/PayrollForm"

export function PayRollDialog(){

    return(

        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-[40px] w-full p-3">
                    Create Payroll
                </Button>
            </DialogTrigger>
             
            <DialogContent className="xl:max-w-7xl lg:max-w-5xl">
                <DialogHeader>
                    <DialogTitle>Payroll</DialogTitle>
                </DialogHeader>
                <PayrollForm/>
            </DialogContent>
        </Dialog>

    )
}
