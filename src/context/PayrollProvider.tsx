import { getActivePayrollWithEmployeeinIt } from "@/controller/payroll";
import { Employee, Payroll } from "@/lib/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export interface PayrollData {
    payroll : Payroll | undefined;
    setPayroll: Dispatch<SetStateAction<Payroll | undefined>>;
}

export const PayrollContext = createContext<PayrollData>({} as PayrollData);

type PayrollDataProps = {
    children : ReactNode;
    employee?: Employee;
}

export default function PayrollDataProvider({children, employee} : PayrollDataProps){
    const [payroll, setPayroll] = useState<Payroll | undefined>(undefined);
    useEffect(()=>{
        if(employee){
            fetchData()
        }
    },[employee])

    const fetchData = async ()=>{
        try {
            const response : Payroll = await getActivePayrollWithEmployeeinIt(employee?.id,"ACTIVE");
            setPayroll(response)
        } catch (error) {
            
        }
    }
    
    return(
        <PayrollContext.Provider value={{payroll, setPayroll}}>
            {children}
        </PayrollContext.Provider>
    )
}