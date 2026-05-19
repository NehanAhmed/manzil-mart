import api from "@/lib/axios"
import type { ApplyForVendorFormValues } from "@/lib/validators/auth.validator"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useAuthRegister = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post("/auth/register", formData)
      return data.user
    },
    onSuccess: () => {
      toast.success("User registered successfully")
    },
    onError: (error: any) => {
      console.error(error)
      toast.error(error?.response?.data?.message ?? "An error occurred")
    },
  })
}

export const useAuthLogin = () =>{
    return useMutation({
        mutationFn: async(formData:{email:string; password:string;username?:string }={email:"", password:"", username:""}) =>{
            const { data } = await api.post("/auth/login", formData)
            return data.user
        },
        onSuccess: () => {
            toast.success("User logged in successfully")
        },
        onError: (error: any) => {
            console.error(error)
            toast.error(error?.response?.data?.message ?? "An error occurred")
        }
    })
}

export const useApplyForVendor = () =>{
    return useMutation({
        mutationFn: async(formData:ApplyForVendorFormValues) =>{
            const { data } = await api.post("/auth/apply", formData)
            return data.user
        },
        onSuccess: () => {
            toast.success("Vendor application submitted successfully")
        },
        onError: (error: any) => {
            console.error(error)
            toast.error(error?.response?.data?.message ?? "An error occurred")
        }
    })
}


export const useLogoutUser = () => {
    return useMutation({
        mutationFn: async() =>{
            const { data } = await api.post("/auth/logout")
            return data.user
        },
        onSuccess: () => {
            toast.success("User logged out successfully")
            
        },
        onError: (error: any) => {
            console.error(error)
            toast.error(error?.response?.data?.message ?? "An error occurred")
        }
    })
}