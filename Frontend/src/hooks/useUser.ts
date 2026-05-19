import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useUserDetails = () => {
  return useQuery({
    queryKey: ['user'],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: async () => {
      const result = await api.get('/auth/user')
      if (result.status !== 200) {
        throw new Error(`Failed to fetch user: ${result.status}`)
      }
      return result.data 
    },
  })
}