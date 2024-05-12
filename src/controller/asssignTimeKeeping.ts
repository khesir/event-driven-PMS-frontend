import { ApiResponse, request } from "@/api/axios"


export async function getAssignTimeKeepingByTypeEmployeePayroll(payrollID: String, employeeID:String, type: String){
    try {
        const response = await request<ApiResponse<any>>("GET",`/assign/time-keeping/data?prID=${payrollID}&empId=${employeeID}&type=${type}`)
        return response.data
    } catch (error) {
        throw error
    }
}