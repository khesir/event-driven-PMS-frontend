import { Payroll } from "@/lib/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface PayrollData {
    payroll : Payroll | undefined;
    setPayroll: Dispatch<SetStateAction<Payroll | undefined>>;
}

export const PayrollContext = createContext<PayrollData>({} as PayrollData);

type PayrollDataProps = {
    children : ReactNode;
}

export default function PayrollDataProvider({children} : PayrollDataProps){
    const [payroll, setPayroll] = useState<Payroll | undefined>(undefined);

    return(
        <PayrollContext.Provider value={{payroll, setPayroll}}>
            {children}
        </PayrollContext.Provider>
    )
}