import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "@/components/ui/form"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "../ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

import { useContext, useEffect, useState } from "react"

import {getAllSignatory} from "@/controller/signatory"
import { DataTable } from "../DataTable"
import { ColumnDef } from "@tanstack/react-table"

import { Card } from "../ui/card"
import { Signatory } from "@/lib/types"
import { payrollSchema } from "@/schemas"


import {generatePayPeriodDates} from "@/lib/payperiodCalculation"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { PayrollContext } from "@/context/PayrollProvider"
import { createPayroll } from "@/controller/payroll"


export type SignatoryData = {
 id: string,
 employeeId: string,
 signatoryName: string,
 fullname: string,
 designation: string,
 department: string,
}

const columns : ColumnDef<SignatoryData>[] =[
    {
        accessorKey: "id",
        header: "ID",
    },{
        accessorKey: "signatoryName",
        header: "Signatory",
    },{
        accessorKey: "fullname",
        header: "Fullname",
    },{
        accessorKey: "designation",
        header: "Designation",
    },{
        accessorKey: "department",
        header: "Department",
    }
]


export function PayrollForm(){
    const {setPayroll} = useContext(PayrollContext)
    const [signatory, setSignatory] = useState<SignatoryData[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [payPeriodDates, setPayPeriodDates] = useState<{ startDate: string; endDate: string; payPeriod: string;} | null>(null);
    const [selectedPayPeriod, setSelectedPayPeriod] = useState<string>();

    const {toast} = useToast();
    const handlePayPeriodChange = (value: string) => {
        setSelectedPayPeriod(value);
        const dates = generatePayPeriodDates(value);
        setPayPeriodDates(dates);
      };

    useEffect(()=> {
        const handleData = async() => {
            try {
                const fetchSignatory = await getAllSignatory()
                
                const newList: SignatoryData[] = fetchSignatory.map( (signatory : Signatory) => {
                    const { id, name, employee } = signatory
                    const {employeeData, department, designation } = employee;
        
                    const { firstname, middlename, lastname } = employeeData;
                    const fullname = `${firstname} ${middlename} ${lastname}`;

                    return{
                        id: id,
                        employeeId: employee.id,
                        signatoryName: name,
                        fullname: fullname,
                        designation: designation.designationName,
                        department: department.name,
                    }
                })
                setSignatory(newList)
            }catch(error){
                console.log(error)
            }
        }
        setIsLoading(true)
        handleData()
        setIsLoading(false)
    }, [])
   
    
    const form = useForm<z.infer<typeof payrollSchema>>({
        resolver: zodResolver(payrollSchema)
    })

    const handleSubmit = async (output: z.infer<typeof payrollSchema>) => {
        try {   
            if(payPeriodDates && output.signatory){
                const newData = {
                    ...output,
                    signatory: {
                        id: output.signatory,
                    },
                    payrollDate: payPeriodDates.payPeriod,
                    start: payPeriodDates.startDate,
                    end: payPeriodDates.endDate,
                }
                toast({
                    variant: "default",
                    title: "Data Added",
                    
                })
                setPayroll(await createPayroll(newData))
            } else {
                toast({
                    variant: "destructive",
                    title: "Error submitting data",
                    description: "Something went wrong when submitting",
                });
            }

           
           
        } catch (error) {
            // If an error occurs during submission, handle it here
            console.error("Error submitting data:", error);
    
            toast({
                variant: "destructive",
                title: "Error submitting data",
                description: "An error occurred while submitting the data. Please try again later.",
            });
        } 
    }

    return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 py-4">
                    <div className="flex flex-col gap-5">
                        <FormField
                            control={form.control}
                            name="signatory"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Signatory</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Signatory" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {signatory.map((d,i) => (
                                                <SelectItem key={i} value ={String(d.id)}>{d.signatoryName}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="payrollFrequency"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Pay Period</FormLabel>
                                    <Select 
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            handlePayPeriodChange(value);
                                            }
                                        }
                                        defaultValue={selectedPayPeriod}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a pay period" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value = {"MONTHLY"}>Montly</SelectItem>
                                            <SelectItem value = {"SEMI_MONTHLY"}>Semi-Monthly</SelectItem>
                                            <SelectItem value = {"BI_WEEKLY"}>Bi-Weekly</SelectItem>
                                            <SelectItem value = {"WEEKLY"}>Weekly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <Card className="p-5">
                        {payPeriodDates ? (
                            <>
                                <p>
                                    Pay period 
                                    <br/>
                                    - start: {payPeriodDates.startDate}<br/>- ends: {payPeriodDates.endDate}
                                    <br/>
                                    <br/>
                                    Payroll : {payPeriodDates.payPeriod}
                                </p>
                            </>
                            ) : (
                            <p>Please select a pay period</p>
                            )}
                        </Card>
                        <DialogTrigger asChild>
                            <Button type="submit">Submit</Button>
                        </DialogTrigger>
                    </div>
                    <div>
                        {isLoading ? (
                            <Card className="p-5">Please Wait While we're fetching data</Card>
                        ) : (
                            <DataTable columns={columns} data={signatory}/>
                        )}
                        
                    </div>
            </div>
        </form>
    </Form>
    
  )
}
