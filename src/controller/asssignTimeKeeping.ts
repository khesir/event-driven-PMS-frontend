import { ApiResponse, request } from "@/api/axios"


export async function getAssignTimeKeepingByTypeEmployeePayroll(payrollID: String, employeeID:String, type: String){
    try {
        const response = await request<ApiResponse<any>>("GET",`/assign/time-keeping/data?prID=${payrollID}&empId=${employeeID}&type=${type}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getAssignTimeKeepByEmployeeIDAndPayroll(payrollID: any, employeeID:any){
    try {
        const response = await request<ApiResponse<any>>("GET",`/assign/time-keeping/data?prID=${payrollID}&empId=${employeeID}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function createAttendance(data: any){
    try {
        const response = await request<ApiResponse<any>>("POST",`/assign/time-keeping`,data)
        return response.data
    } catch (error) {
        throw error
    }
}