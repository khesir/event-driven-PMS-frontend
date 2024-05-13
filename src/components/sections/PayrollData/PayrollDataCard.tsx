import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdjustmentListDataContext } from "@/context/AdjustmentDataProvider";
import { PayrollDetailsDataContext } from "@/context/PayrollDataProvider";
import { PayrollContext } from "@/context/PayrollProvider";
import {getAssignTimeKeepingByTypeEmployeePayroll } from "@/controller/asssignTimeKeeping";
import { calculateTotalPay } from "@/lib/payrollCalcutions";

import { AssignTimeKeeping } from "@/lib/types";
import { useContext, useEffect, useState } from "react";


export function PayDataCard(){

    return(
        <Card>
            <Table>
                <TableHeader>
                     <TableRow>
                        <TableHead>
                            Category
                        </TableHead>
                        <TableHead>
                            Hours
                        </TableHead>
                        <TableHead>
                            Total
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <RegularPayRow/>
                    <OvertimePayRow/>
                    <NightDiffPayRow/>
                    <HolidayPayRow/>
                    <OthersPayRow/>
                </TableBody>
            </Table>
        </Card>
    )
}

export function RegularPayRow() {
    const {employee} = useContext(PayrollDetailsDataContext)
    const {payroll} = useContext(PayrollContext)
    const [assignTimeKeeping,setAssignTimeKeeping] = useState<AssignTimeKeeping[] | undefined>(undefined);
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() =>{
        handleData()
    },[])
    
    const handleData = async() => {
        try {
            const response = await getAssignTimeKeepingByTypeEmployeePayroll(String(payroll?.id),String(employee?.id), "REGULAR")
            console.log(response)
            setAssignTimeKeeping(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if(assignTimeKeeping && assignTimeKeeping.length > 0){
            setTotalAmount(assignTimeKeeping.reduce((total, timeKeeping) =>  total + parseFloat(Number(timeKeeping.hoursWorked).toString()), 0));
        }
    },[assignTimeKeeping])

    
    return(
        <TableRow>
            <TableCell>Regular Pay</TableCell>
            <TableCell>{totalAmount}</TableCell>
            <TableCell>{calculateTotalPay(totalAmount,"REGULAR")}</TableCell>
        </TableRow>
    )
}

export function OvertimePayRow() {

    const {employee} = useContext(PayrollDetailsDataContext)
    const {payroll} = useContext(PayrollContext)
    const [assignTimeKeeping,setAssignTimeKeeping] = useState<AssignTimeKeeping[] | undefined>(undefined);
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() =>{
        handleData()
    },[])
    
    const handleData = async() => {
        try {
            const response = await getAssignTimeKeepingByTypeEmployeePayroll(String(payroll?.id),String(employee?.id), "OVERTIME")
            console.log(response)
            setAssignTimeKeeping(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if(assignTimeKeeping && assignTimeKeeping.length > 0){
            setTotalAmount(assignTimeKeeping.reduce((total, timeKeeping) =>  total + parseFloat(Number(timeKeeping.hoursWorked).toString()), 0));
        }
    },[assignTimeKeeping])

    return(
        <TableRow>
            <TableCell>Overtime Pay</TableCell>
            <TableCell>{totalAmount}</TableCell>
            <TableCell>{calculateTotalPay(totalAmount,"OVERTIME")}</TableCell>
        </TableRow>
    )
}
export function NightDiffPayRow() {
    const {employee} = useContext(PayrollDetailsDataContext)
    const {payroll} = useContext(PayrollContext)
    const [assignTimeKeeping,setAssignTimeKeeping] = useState<AssignTimeKeeping[] | undefined>(undefined);
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() =>{
        handleData()
    },[])
    
    const handleData = async() => {
        try {
            const response = await getAssignTimeKeepingByTypeEmployeePayroll(String(payroll?.id),String(employee?.id), "NIGHTSHIFT")
            console.log(response)
            setAssignTimeKeeping(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if(assignTimeKeeping && assignTimeKeeping.length > 0){
            setTotalAmount(assignTimeKeeping.reduce((total, timeKeeping) =>  total + parseFloat(Number(timeKeeping.hoursWorked).toString()), 0));
        }
    },[assignTimeKeeping])

    return(
        <TableRow>
            <TableCell>Night Differential</TableCell>
            <TableCell>{totalAmount}</TableCell>
            <TableCell>{calculateTotalPay(totalAmount,"NIGHTSHIFT")}</TableCell>
        </TableRow>
    )
}
export function HolidayPayRow() {

    const {employee} = useContext(PayrollDetailsDataContext)
    const {payroll} = useContext(PayrollContext)
    const [assignTimeKeeping,setAssignTimeKeeping] = useState<AssignTimeKeeping[] | undefined>(undefined);
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() =>{
        handleData()
    },[])
    
    const handleData = async() => {
        try {
            const response = await getAssignTimeKeepingByTypeEmployeePayroll(String(payroll?.id),String(employee?.id), "VACATION")
            console.log(response)
            setAssignTimeKeeping(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if(assignTimeKeeping && assignTimeKeeping.length > 0){
            setTotalAmount(assignTimeKeeping.reduce((total, timeKeeping) =>  total + parseFloat(Number(timeKeeping.hoursWorked).toString()), 0));
        }
    },[assignTimeKeeping])

    return(
        <TableRow>
            <TableCell>Holiday Pay</TableCell>
            <TableCell>{totalAmount}</TableCell>
            <TableCell>{calculateTotalPay(totalAmount,"VACATION")}</TableCell>
        </TableRow>
    )
}
export function OthersPayRow() {
    const {adjustments} = useContext(AdjustmentListDataContext)
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        const total = adjustments?.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
        setTotalAmount(total?? 0)
    },[adjustments ])
    return(
        <TableRow>
            <TableCell>Others</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{totalAmount}</TableCell>
        </TableRow>
    )
}