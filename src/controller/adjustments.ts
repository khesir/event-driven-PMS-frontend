import { ApiResponse, request } from "@/api/axios"

export async function CreateAdjustment(data :any) {
    try {
        const response = await request<ApiResponse<any>>("POST",`/adjustment`,data)
        return response.data
    } catch (error) {
        throw error
    }
}


export async function getAdjustmentDataForEmployee(payrollID : any,  employeeID: any) {
    try {
        const response = await request<ApiResponse<any>>("GET",`/adjustment/data?empId=${employeeID}&prId=${payrollID}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function deleteAdjustment(id :any) {
    try {
        const response = await request<ApiResponse<any>>("DELETE",`/adjustment/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}
