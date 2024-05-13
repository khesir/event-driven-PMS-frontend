import { Employee } from "@/lib/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export interface PayrollDetailsData {
    employee :Employee | undefined;
    setEmployee: Dispatch<SetStateAction<Employee | undefined>>;
}

export const PayrollDetailsDataContext = createContext<PayrollDetailsData>({} as PayrollDetailsData);

type PayrollDetailsDataProps = {
    children : ReactNode;
    empData : Employee;
}

export default function PayrollDetailsDataProvider({children,empData} : PayrollDetailsDataProps){
    
    const [employee,setEmployee] = useState<Employee | undefined>(undefined);

    useEffect(()=>{
        setEmployee(empData);
    },[empData])

    return(
        <PayrollDetailsDataContext.Provider 
            value={{
                employee,
                setEmployee
            }}
        >
            {children}
        </PayrollDetailsDataContext.Provider>
    )
}