import { AddUserDialog } from "@/components/dialog/AddUserDialog";
import PageTittle from "@/components/PageTitle";
import { Card } from "@/components/ui/card";
import { TableBody, TableRow, TableCell, Table } from "@/components/ui/table";
import { AuthContext } from "@/context/AuthProvider";
import { getEmployeeUserByEmail } from "@/controller/userController";
import { Employee, User } from "@/lib/types";
import { useContext, useState, useEffect } from "react";

type EmpProp = {
    emp : Employee
}

export function EmployeeUserDetail({emp}: EmpProp){

    const {auth} = useContext(AuthContext);
    const [user, setUser] = useState<Boolean>()

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () =>{
        try {
            const response = await getEmployeeUserByEmail(emp.employeeData.email)
            if(response === 404){
                setUser(false)
            } else if(response === 200){
                setUser(true)
            } else if(response){
                setUser(true)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <>
            <div className='font-bold w-full flex justify-between align-middle'>
                    <PageTittle title='User Account'/>
                    { user === undefined && auth.accessLevel === "ADMIN" ? (
                        <div className='relative p-2'>
                        <AddUserDialog employee = {emp}/>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <Card className='w-full'>
                    <Table>
                        {
                        user === false ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell className='flex justify-center'>
                                    User has currently no account
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell className='flex justify-center'>
                                        User has account {emp.employeeData.email}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        )
                        }
                    </Table>
                </Card>
        </>
    )
}