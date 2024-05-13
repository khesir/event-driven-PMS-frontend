import * as z from "zod"

export const AttendanceFormSchema = z.object({
    hoursWorked : z.string(),
    type: z.string(),
})

export const AdjustmentFormSchema = z.object({
    type: z.string().min(2),
    category: z.string().min(2),
    name: z.string().min(2),
    amount: z.string().min(2),
    remarks: z.string().optional()
})

export const RegisterForm = z.object({
    email: z.string().min(2),
    password: z.string().min(2),
    role: z.string().min(2)
})

export const LoginForm = z.object({
    email: z.string().email().min(2),
    password: z.string().min(2,{
        message: "Password must be atleast 2 characters"
    })
})
export const postSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});

export const payrollSchema = z.object({
    signatory: z.string().min(1),
    payrollFrequency: z.string().min(1),
})

export const DataEmployeeSchema = z.object({
    firstname: z.string().min(1),
    middlename: z.string().min(1),
    lastname: z.string().min(1),
    birthday: z.string().min(1),
    contact: z.number().min(1),
    email: z.string().email().min(1),
    gender: z.string().min(1),
    addressLine: z.string().min(1),
    barangay: z.string().min(1),
    country: z.string().min(1),
    province: z.string().min(1),
})

export const EmployeeSchema = z.object({
    department: z.string().min(1),
    designation: z.string().min(1),
    employeeType: z.string().min(1),
    // optional details
    bankAccountDetails: z.string(),
    philhealth: z.string(),
    socialSecurity: z.string(),
    taxIdentification: z.string(),
    hourlyRate: z.string()
})

export const DepartmentEmployeeSchema = z.object({
    department: z.string().min(1),
})


export const DesignationEmployeeSchema = z.object({
    designation: z.string().min(1),
})

export const EmployeeStatusSchema = z.object({
    status: z.string().min(1),
})

export const AssignPayheadSchema = z.object({
    payhead: z.string().min(1).optional(),
    amount : z.string().min(1),
    description: z.string().min(1)
})

export const SignatorySchema = z.object({
    name : z.string().min(1),
    status: z.string().min(1),
    employee: z.string().min(1),
})