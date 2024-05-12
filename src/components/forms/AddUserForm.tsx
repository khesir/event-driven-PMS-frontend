import { RegisterForm } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { DialogTrigger } from "@radix-ui/react-dialog";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Employee } from "@/lib/types";
import { toast } from "../ui/use-toast";
import { request } from "@/api/axios";

type Props = {
    empData : Employee
}

export function AddUserForm({empData} : Props){

    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof RegisterForm>>({
        resolver: zodResolver(RegisterForm),
        defaultValues:{
            email: empData.employeeData.email,
            role: '',
            password: '',
        }
        
    });
    const handleSubmit = async (data:z.infer<typeof RegisterForm>) => {
        try {
            setIsSubmitting(true)
            const newData = {
                ...data,
                employee_id: String(empData.id)
            }
            await request("POST", "/auth/register",newData)
            toast({
                variant: "default",
                title: "Data Added",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(newData, null, 2)}</code>
                    </pre>
                    ),
            })
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    disabled = {isSubmitting}
                                                    placeholder="Email"
                                                    readOnly
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                type="password"
                                                    disabled = {isSubmitting}
                                                    placeholder="Password"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                )}
                                
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <Select onValueChange={ field.onChange } defaultValue={field.value} disabled = {isSubmitting}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                    placeholder="Access Level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value = {"USER"}>User</SelectItem>
                                                <SelectItem value = {"MANAGER"}>Manager</SelectItem>
                                                <SelectItem value = {"ADMIN"}>Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <DialogTrigger asChild>
                                <Button type="submit" disabled={isSubmitting}>Submit</Button>
                            </DialogTrigger>
                        </form>
                </Form>
    )
}