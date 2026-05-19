import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const result = await api.get("/admin/dashboard-stats")
      return result.data
    },
  })
}
