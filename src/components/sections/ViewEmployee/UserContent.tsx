import { AddUserDialog } from "@/components/dialog/AddUserDialog";
import PageTittle from "@/components/PageTitle";
import { Card } from "@/components/ui/card";
import { TableBody, TableRow, TableCell, TableHeader, TableHead, Table } from "@/components/ui/table";
import { AuthContext } from "@/context/AuthProvider";
import { getEmployeeUserByEmail } from "@/controller/userController";
import { Employee, User } from "@/lib/types";
import { useContext, useState, useEffect } from "react";

type EmpProp = {
    emp : Employee
}

export function EmployeeUserDetail({emp}: EmpProp){

    const {auth} = useContext(AuthContext);
    const [user, setUser] = useState<User>()

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () =>{
        try {
            const response = await getEmployeeUserByEmail(emp.employeeData.email)
            if(response === 404){
                setUser(undefined)
            } else if(response){
                setUser(response)
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
                        user === undefined ? (
                            <TableBody>
                                <TableRow>
                                    <TableCell className='flex justify-center'>
                                    User has currently no account
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (
                            <>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            Category
                                        </TableHead>
                                        <TableHead>
                                            Value
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Email
                                        </TableCell>
                                        <TableCell>
                                            {user.email}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            AccessLevel
                                        </TableCell>
                                        <TableCell>
                                            {user.role}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Password
                                        </TableCell>
                                        <TableCell>
                                            {user.password}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </>
                        )
                        }
                    </Table>
                </Card>
        </>
    )
}