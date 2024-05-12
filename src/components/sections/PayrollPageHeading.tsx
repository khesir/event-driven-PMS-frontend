

import { PayRollDialog } from "../dialog/PayRollDialog";
import { Input } from "../ui/input";


export function PayrollPageHeading(){
    
    return(
        <div className='flex gap-3 items-center mx-1'>
            <div className='relative p-2'>
            <PayRollDialog/>
            </div>
            <Input placeholder='Search PayrollID'/>
        </div>
    )
}