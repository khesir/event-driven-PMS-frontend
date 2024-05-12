import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useContext, useEffect, useState } from "react";
import { getEmployeeDataById } from "@/controller/dataemployee";
import { Department, Designation, EmployeeData } from "@/lib/types";
import { sumbitEmployeeData } from "@/controller/employee";
import { z } from "zod";
import { EmployeeSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllDesignation } from "@/controller/designation";
import { getAllDepartments } from "@/controller/department";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Table, TableCell, TableRow, TableBody } from "../ui/table";
import { Card } from "../ui/card";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { OnAddEmployeeData } from "@/context/NewEmployeeDataProvider";
import { Input } from "../ui/input";
import PageTittle from "../PageTitle";

export function AddEmployeeForm({id} :any){
    
    const {setEmployeeData} = useContext(OnAddEmployeeData)

    const {toast} = useToast();
    const [dataEmployee, setDataEmployee] = useState<EmployeeData>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [department, setDepartment] = useState<Department[]>([]);
    const [designation, setDesignation] = useState<Designation[]>([]);
    
    useEffect(() => {
        const handleData = async () => {
            try{
                const fetch = await getEmployeeDataById(id);
                setDataEmployee(fetch);
            } catch(error){
                console.log(error)
            }
        }
        const getDepartments = async() =>{
            try {
                const fetch = await getAllDepartments();
                setDepartment(fetch);
            } catch (error) {
                console.log(error)
            }
        }
        const getDesignations = async() =>{
            try {
                const fetch = await getAllDesignation();
                console.log(fetch)
                setDesignation(fetch);
            } catch (error) {
                console.log(error)
            }
        }
        handleData();
        getDepartments();
        getDesignations();
    },[])

    const form = useForm<z.infer<typeof EmployeeSchema>>({
        resolver: zodResolver(EmployeeSchema),
        defaultValues:{
            department : '',
            designation : '',
            employeeType: '',
            bankAccountDetails: '',
            philhealth: '',
            socialSecurity:'',
            taxIdentification: '',
            hourlyRate: ''
        }
    });
    // empNum: `EMP${String(employeeCount).padStart(3, '0')}`, 
    const handleSubmit = async (data:z.infer<typeof EmployeeSchema>) => {
        setIsSubmitting(true)
        try{
            
            const newData = {
                ...data,
                employeeData: dataEmployee,
                department: department.find(d => d.id === Number(data.department)),
                designation: designation.find(d => d.id === Number(data.designation)),
                employeeType: data.employeeType
            }
            const check = await sumbitEmployeeData(newData);
            if(check){
                
                setEmployeeData(dataEmployee);
            
            }
            toast({
                variant: "default",
                title: "Data Added",
            })
        } catch (error){
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(error, null, 2)}</code>
                    </pre>
                    ),
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    
    return(
        <div className="grid grid-cols-3 gap-5 w-full h-full">
            <div className=" col-span-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="w-full flex flex-col gap-5">
                            
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="department"
                                    render = {({field}) => (
                                        <FormItem>
                                            <FormLabel>Department</FormLabel>
                                                <Select onValueChange={ field.onChange } defaultValue={field.value} disabled={isSubmitting}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                            placeholder="Choose a Department" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {department.map((d,i) => (
                                                            <SelectItem key={i} value={String(d.id)}>{d.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="designation"
                                    render = {({field}) => (
                                        <FormItem>
                                            <FormLabel>Designation</FormLabel>
                                                <Select onValueChange={ field.onChange } defaultValue={field.value} disabled={isSubmitting}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                            placeholder="Choose a Designation" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {designation.map((d,i) => (
                                                            <SelectItem key={i} value={String(d.id)}>{d.designationName}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="employeeType"
                                    render = {({field}) => (
                                        <FormItem>
                                            <FormLabel>Employee Type</FormLabel>
                                                <Select onValueChange={ field.onChange } defaultValue={field.value} disabled ={isSubmitting}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                            placeholder="Choose a Designation" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="FULL_TIME">Full-time</SelectItem>
                                                        <SelectItem value="PART_TIME">Part-time</SelectItem>
                                                        <SelectItem value="CONTRACT">Contractor</SelectItem>
                                                        <SelectItem value="TEMPORARY">Temporary</SelectItem>
                                                        <SelectItem value="INTERN">Intern</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <PageTittle title="Additional Information (Optional)" className=" text-sm"/>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="bankAccountDetails"
                                    render = {({field}) => (
                                        <FormItem>
                                            <FormLabel>Bank</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    disabled = {isSubmitting}
                                                    placeholder="Bank Number" 
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="philhealth"
                                    render = {({field}) => (
                                        <FormItem>
                                            <FormLabel>Philhealth</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    disabled = {isSubmitting}
                                                    placeholder="Serial ID" 
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="socialSecurity"
                                    render = {({field}) => (
                                        <FormItem>
                                            <FormLabel>Social Security</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    disabled = {isSubmitting}
                                                    placeholder="socialSec" 
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="taxIdentification"
                                    render = {({field}) => (
                                        <FormItem>
                                            <FormLabel>Tax ID</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    disabled = {isSubmitting}
                                                    placeholder="Serial ID" 
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="hourlyRate"
                                    render = {({field}) => (
                                        <FormItem>
                                            <FormLabel>Hourly Rate</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    disabled = {isSubmitting}
                                                    placeholder="0" 
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogTrigger asChild>
                                <Button type="submit" disabled={isSubmitting}>Submit</Button>
                            </DialogTrigger>
                        </form>
                </Form>
            </div>
            <div className="">
                <Card className="flex flex-col p-5">
                    <p>Employee Data</p>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Full Name</TableCell>
                                <TableCell>{`${dataEmployee?.lastname}, ${dataEmployee?.firstname} ${dataEmployee?.middlename}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Contact</TableCell>
                                <TableCell>{`${dataEmployee?.contact}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>BOD</TableCell>
                                <TableCell>{`${dataEmployee?.birthday}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>{`${dataEmployee?.email}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Gender</TableCell>
                                <TableCell>{`${dataEmployee?.gender}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Full Adress</TableCell>
                                <TableCell>{`${dataEmployee?.barangay}, ${dataEmployee?.addressLine}, ${dataEmployee?.province}, ${dataEmployee?.country}`}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    )
}