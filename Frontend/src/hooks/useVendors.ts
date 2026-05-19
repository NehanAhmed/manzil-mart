import api from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { AxiosError } from "axios"
import type { VendorsResponse, VendorStatusResponse } from "@/types/vendor.types"

export const usePendingVendors = () => {
  return useQuery({
    queryKey: ["pendingVendors"],
    queryFn: async () => {
      const result = await api.get<VendorsResponse>("/admin/fetch-all-pending-vendors")
      return result.data
    },
  })
}

export const useUpdateVendorStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      vendorId,
      status,
    }: {
      vendorId: string
      status: "approved" | "rejected"
    }) => {
      const result = await api.post<VendorStatusResponse>("/admin/update-vendor-status", {
        vendorId,
        status,
      })
      return result.data
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["pendingVendors"] })
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message ?? "Failed to update vendor status")
    },
  })
}
