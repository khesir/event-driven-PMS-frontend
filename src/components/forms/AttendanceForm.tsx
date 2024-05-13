import { AttendanceFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Employee, Payroll } from "@/lib/types";
import { toast } from "../ui/use-toast";
import { PayrollContext } from "@/context/PayrollProvider";
import { EmployeeDataContext } from "@/context/EmployeeProvider";
import { AssignTimeKeepingDataContext } from "@/context/AttendanceDataProvider";
import { createAttendance } from "@/controller/asssignTimeKeeping";


export function AttendanceForm(){

    const [isSubmitting, setIsSubmitting] = useState(false);
    const {payroll} = useContext(PayrollContext);
    const {employee} = useContext(EmployeeDataContext)
    const {setAssignTimeKeeping} = useContext(AssignTimeKeepingDataContext)
    const form = useForm<z.infer<typeof AttendanceFormSchema>>({
        resolver: zodResolver(AttendanceFormSchema),
        defaultValues:{
            hoursWorked: '',
            type: '',
        }
        
    });
    const handleSubmit = async (data:z.infer<typeof AttendanceFormSchema>) => {
        try {
            setIsSubmitting(true)

            if(employee !== undefined && payroll !== undefined){
                const newData = {
                    ...data,
                    employee: {
                        id: employee.id,
                    },
                    timeKeeping: {
                        id: 1
                    },
                    payroll:{
                        id:  payroll.id
                    }
                }
                setAssignTimeKeeping(await createAttendance(newData))
                toast({
                    variant: "default",
                    title: "Data Added",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(newData, null, 2)}</code>
                        </pre>
                        ),
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(error, null, 2)}</code>
                    </pre>
                    ),
            })
        } finally{
            setIsSubmitting(false)
        }
    }
    return(
        <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="w-full flex flex-col gap-5">
                            
                            <FormField
                                control={form.control}
                                name="hoursWorked"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hours</FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled = {isSubmitting}
                                                placeholder="eg. 8"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                            )}
                            />   
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value} disabled = {isSubmitting}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                placeholder="Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value = {"REGULAR"}>Regular</SelectItem>
                                            <SelectItem value = {"OVERTIME"}>Overtime</SelectItem>
                                            <SelectItem value = {"VACATION"}>Vacation</SelectItem>
                                            <SelectItem value = {"ON_BREAK"}>OnBreak</SelectItem>
                                            <SelectItem value = {"LATE"}>Late</SelectItem>
                                            <SelectItem value = {"NIGHTSHIFT"}>Night Shift</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                            />
                            
                                <Button type="submit" disabled={isSubmitting}>Submit</Button>

                        </form>
                </Form>
    )
}