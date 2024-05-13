import { Employee } from "@/lib/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { getEmployeeByEmail } from "@/controller/employee";

export interface EmployeeData {
    employee :Employee | undefined;
    setEmployee: Dispatch<SetStateAction<Employee | undefined>>;
}

export const EmployeeDataContext = createContext<EmployeeData>({} as EmployeeData);

type EmployeeDataProps = {
    children : ReactNode;
}

export default function EmployeeDataProvider({children} : EmployeeDataProps){
    const {auth} = useContext(AuthContext);
    const [employee,setEmployee] = useState<Employee | undefined>(undefined);

    useEffect(()=>{
        fetchData();
    },[auth.id])

    const fetchData = async () => {
        try {
            const data = await getEmployeeByEmail(auth.id);
            console.log(data)
            setEmployee(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return(
        <EmployeeDataContext.Provider 
            value={{
                employee,
                setEmployee
            }}
        >
            {children}
        </EmployeeDataContext.Provider>
    )
}