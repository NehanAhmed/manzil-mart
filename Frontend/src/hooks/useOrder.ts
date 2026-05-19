import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async() => {
            const result = await api.get('/order/user')
            return result.data
        }
    })
}

export const useAdminOrders = (page = 1) => {
    return useQuery({
        queryKey: ['adminOrders', page],
        queryFn: async() => {
            const result = await api.get(`/admin/fetch-all-orders?page=${page}&limit=10`)
            return result.data
        }
    })
}

export const useFetchSingleOrder = (id: string) =>{
    return useQuery({
        queryKey: ['order', id],
        queryFn: async() => {
            const result = await api.get(`/order/${id}`)
            return result.data
        }
    })
}
    
