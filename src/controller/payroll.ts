import { ApiResponse, request } from "@/api/axios"

export async function getActivePayrollWithEmployeeinIt(empId:any,status:any){
    try {
        const response = await request<ApiResponse<any>>("GET",`/payroll/fetch?empId=${empId}&status=${status}`)

        return response.data
    } catch (error) {
        throw error
    }
}
export async function getAllPayRoll(){
    try {
        const response = await request<ApiResponse<any>>("GET","/payroll")

        return response.data
    } catch (error) {
        throw error
    }
}

export async function createPayroll(data : any){
    try {
        const response = await request<ApiResponse<any>>("POST","/payroll",data)

        return response.data
    } catch (error) {
        throw error
    }
}

export async function getPayrollByID(id : any){
    if (id == "") return null
    try {
        const response = await request<ApiResponse<any>>("GET",`/payroll/${id}`)
        
        return response.data
    } catch (error) {
        throw error
    }
}



export async function UpdatePayroll(data: any, id: string){
    try {
       console.log(data)
        if(id === '') throw Error
        const response = await request<ApiResponse<any>>("PUT",`/payroll/${id}`,data)

        return response.data
    } catch (error) {
        throw error
    }
}

// =====================================================================================
// Extra functions

export async function findAllNotInPayrollForPayrollId(id : string ){
    try {
        if(id === '') throw Error
        const response = await request<ApiResponse<any>>("GET", `/payroll/notInPayroll?id=${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function addEmployeeInPayroll(id: String, payrollID:String){
    try {

        console.log(id)
        console.log(payrollID)
        const response = await request<ApiResponse<any>>("GET",`/payroll/add?empId=${id}&payrollID=${payrollID}`)
        console.log(response)
        return response
    } catch (error) {
        throw error
    }
}

export async function removeEmployeeInPayroll(id: String, payrollID:String){
    try {
        console.log(id)
        console.log(payrollID)
        const response = await request<ApiResponse<any>>("GET",`/payroll/remove?empId=${id}&payrollID=${payrollID}`)
        console.log(response)
        return response
    } catch (error) {
        throw error
    }
}

export async function getPayrollByEmployeeID(id: string){
    try {
        const response = await request<ApiResponse<any>>("GET",`/payroll/employee?id=${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}