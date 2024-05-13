import { ApiResponse, request } from "@/api/axios"

export async function getEmployeeUserByEmail(email : String){
    try {
        const response = await request<ApiResponse<any>>("GET",`/user/email?args=${email}`)
        return response.data
    } catch (error : any) {
       return error.response.status
    }
}