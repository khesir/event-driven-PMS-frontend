import { deleteAdjustment, getAdjustmentDataForEmployee } from "@/controller/adjustments";
import { AdjustmentData } from "@/lib/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";


export interface AdjustmentListData {
    adjustments: AdjustmentData[] | undefined;
    setAdjustments : Dispatch<SetStateAction<AdjustmentData[] | undefined>>;
    addAdjustments: (adjustment : AdjustmentData) => void;
    removeAdjustments: (adjustment : AdjustmentData) => void;
}

export const AdjustmentListDataContext = createContext<AdjustmentListData>({} as AdjustmentListData);

type AdjustmentListDataProps ={
    children : ReactNode;
    employeeId: Number | undefined,
    payrollId: Number | undefined
}

export default function AdjustmentListDataProvider({children,employeeId,payrollId} : AdjustmentListDataProps){

    const [adjustments,setAdjustments] = useState<AdjustmentData[] | undefined>(undefined);

    useEffect(() => {
        if(employeeId != undefined && payrollId !=undefined){
            handleData()     
        }
    },[employeeId,payrollId])
    const handleData = async() => {
        try {
            const response = await getAdjustmentDataForEmployee(payrollId,employeeId)
            setAdjustments(response)
        } catch (error) {
            console.log(error)
        }
    }

    const addAdjustments  = async (adjustment : AdjustmentData)=>{
        setAdjustments(prevState => [...(prevState || []),adjustment])
    }

    const removeAdjustments  = async (adjustment : AdjustmentData) =>{
        
        const updatedAdjustments = adjustments?.filter(adj => adj.id !== adjustment.id);
        await deleteAdjustment(adjustment.id)
        setAdjustments(updatedAdjustments);

    }

    return(
        <AdjustmentListDataContext.Provider value={{
            adjustments,
            setAdjustments,
            addAdjustments,
            removeAdjustments}}>
            {children}
        </AdjustmentListDataContext.Provider>
    )
}