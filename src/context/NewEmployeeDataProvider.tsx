import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { EmployeeData } from "@/lib/types";

export interface NewEmployeeData {
    employeeData: EmployeeData | undefined;
    setEmployeeData: Dispatch<SetStateAction<EmployeeData | undefined>>;
}

export const OnAddEmployeeData = createContext<NewEmployeeData>({} as NewEmployeeData);

type NewEmployeeDataProp = {
    children: ReactNode;
}

export default function NewEmployeeDataProvider({ children }: NewEmployeeDataProp) {

    const [employeeData, setEmployeeData] = useState<EmployeeData | undefined>(undefined);

    return (
        <OnAddEmployeeData.Provider value={{ employeeData, setEmployeeData }}>
            {children}
        </OnAddEmployeeData.Provider>
    )
}