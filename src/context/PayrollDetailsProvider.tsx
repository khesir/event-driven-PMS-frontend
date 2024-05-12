import { getPayrollByID, findAllNotInPayrollForPayrollId, removeEmployeeInPayroll, addEmployeeInPayroll } from "@/controller/payroll";
import { Employee, Payroll } from "@/lib/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export interface EmployeePayrollDetails {
    availableEmployee: Employee[] | undefined;
    employeeInPayroll: Employee[] | undefined;
    setAvaiableEmployee: Dispatch<SetStateAction<Employee[] | undefined>>;
    setEmployeeInPayroll: Dispatch<SetStateAction<Employee[] | undefined>>;
    addEmployeeToPayroll: (employee: Employee) => void;
    removeEmployeeFromPayroll: (employee: Employee) => void;
}


export const PayrollEmployeeListContext = createContext<EmployeePayrollDetails>({} as EmployeePayrollDetails);

type EmployeePayrollDetailsProps = {
    children : ReactNode;
    payrollId: number;
}

export default function PayrollDetailsProvider({children,payrollId} : EmployeePayrollDetailsProps){

    const [availableEmployee,setAvaiableEmployee] = useState<Employee[] | undefined>(undefined);

    const [employeeInPayroll,setEmployeeInPayroll] = useState<Employee[] | undefined>(undefined);

    useEffect(() =>{
        if(payrollId){
            fetchData()
        }
      },[payrollId])
      
    const fetchData =async () =>{
        try {
            const data : Payroll = await getPayrollByID(payrollId);
            const employeeNotInPayroll : Employee[] = await findAllNotInPayrollForPayrollId( String(payrollId) );
            setAvaiableEmployee(employeeNotInPayroll)
            setEmployeeInPayroll(data.employee);
        } catch (error){
            console.log(error)
        }
    }

    const addEmployeeToPayroll  = async (employee: Employee) =>{
        const updatedAvailableEmployee = availableEmployee?.filter(emp => emp.id !== employee.id);
        await addEmployeeInPayroll(String(employee.id),String(payrollId))
        setAvaiableEmployee(updatedAvailableEmployee);
        
        setEmployeeInPayroll(prevState => [...(prevState || []),employee])
    }

    const removeEmployeeFromPayroll  = async (employee: Employee) =>{
        const updatedEmployeeInPayroll = employeeInPayroll?.filter(emp => emp.id !== employee.id);
        await removeEmployeeInPayroll(String(employee.id),String(payrollId))
        setEmployeeInPayroll(updatedEmployeeInPayroll);


        setAvaiableEmployee(prevState => [...(prevState || []), employee])
    }

    return(
        <PayrollEmployeeListContext.Provider 
            value={{
                availableEmployee, 
                setAvaiableEmployee,
                employeeInPayroll,
                setEmployeeInPayroll,
                addEmployeeToPayroll,
                removeEmployeeFromPayroll,
            }}>
            {children}
        </PayrollEmployeeListContext.Provider>
    )
}