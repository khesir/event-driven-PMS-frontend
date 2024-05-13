
import { getAssignTimeKeepByEmployeeIDAndPayroll } from "@/controller/asssignTimeKeeping";
import { AssignTimeKeeping } from "@/lib/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";


export interface AssignTimeKeepingData {
    assignTimeKeeping: AssignTimeKeeping[] | undefined;
    setAssignTimeKeeping : Dispatch<SetStateAction<AssignTimeKeeping[] | undefined>>;
    addAssignTimeKeeping: (adjustment : AssignTimeKeeping) => void;
}

export const AssignTimeKeepingDataContext = createContext<AssignTimeKeepingData>({} as AssignTimeKeepingData);

type AssignTimeKeepingDataProps ={
    children : ReactNode;
    employeeId: Number | undefined,
    payrollId: Number | undefined
}

export default function AssignTimeKeepingDataProvider({children, employeeId,payrollId} : AssignTimeKeepingDataProps){

    const [assignTimeKeeping,setAssignTimeKeeping] = useState<AssignTimeKeeping[] | undefined>(undefined);

    useEffect(() => {
        if(employeeId != undefined && payrollId !=undefined){
            handleData()     
        }
    },[employeeId,payrollId])
    const handleData = async() => {
        try {
            const response = await getAssignTimeKeepByEmployeeIDAndPayroll(payrollId,employeeId)
            console.log(response)
            setAssignTimeKeeping(response)
        } catch (error) {
            console.log(error)
        }
    }

    const addAssignTimeKeeping  = async (adjustment : AssignTimeKeeping)=>{
        setAssignTimeKeeping(prevState => [...(prevState || []),adjustment])
    }

    return(
        <AssignTimeKeepingDataContext.Provider value={{
            assignTimeKeeping,
            setAssignTimeKeeping,
            addAssignTimeKeeping}}>
            {children}
        </AssignTimeKeepingDataContext.Provider>
    )
}