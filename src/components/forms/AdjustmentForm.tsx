import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import PageTittle from "../PageTitle";
import { Input } from "../ui/input";
import { AdjustmentFormSchema } from "@/schemas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { PayrollDetailsDataContext } from "@/context/PayrollDataProvider";
import { useParams } from "react-router-dom";
import { AdjustmentListDataContext } from "@/context/AdjustmentDataProvider";
import { CreateAdjustment } from "@/controller/adjustments";


export function AdjustmentForm(){
    const { id } = useParams<{ id: string }>()
    const {addAdjustments} = useContext(AdjustmentListDataContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {employee} = useContext(PayrollDetailsDataContext)
    useEffect(() => {

    },[])

    const form = useForm<z.infer<typeof AdjustmentFormSchema>>({
        resolver: zodResolver(AdjustmentFormSchema),
        defaultValues: {
            type:"",
            category:"",
            name: "",
            amount: "",
            remarks:"",
        }
    });
    const handleSubmit = async (data:z.infer<typeof AdjustmentFormSchema>) => {
        setIsSubmitting(true)
        try{
            const newData ={
                ...data,
                employee: {
                    id: employee?.id
                },
                payroll: {
                    id: id
                }
            }
            console.log(newData)
            addAdjustments(await CreateAdjustment(newData))
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full flex flex-col gap-5 p-5">
                    <PageTittle title="Adjustment Form"/>
                    <FormField
                        control={form.control}
                        name="category"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value} disabled={isSubmitting}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                placeholder="Select a Category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="ALLOWANCE">Allowance</SelectItem>
                                            <SelectItem value="BONUS">Bonus</SelectItem>
                                            <SelectItem value="COMMISIONS">Commisions</SelectItem>
                                            <SelectItem value="MISCELLANEOUS">Miscellaneous</SelectItem>
                                            <SelectItem value="SALARY_ADJUSTMENTS">Salary Adjustments</SelectItem>
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                    <Select onValueChange={ field.onChange } defaultValue={field.value} disabled ={isSubmitting}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                placeholder="Select a Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="DEDUCTION">Deduction</SelectItem>
                                            <SelectItem value="EARNING">Earning</SelectItem>
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled = {isSubmitting}
                                        placeholder="Name" 
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled = {isSubmitting}
                                        placeholder="eg. 1000" 
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="remarks"
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Remarks</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        disabled = {isSubmitting}
                                        placeholder="what is this about" 
                                        {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />


                <Button type="submit" disabled={isSubmitting}>Submit</Button>
            </form>
        </Form>
    )
}