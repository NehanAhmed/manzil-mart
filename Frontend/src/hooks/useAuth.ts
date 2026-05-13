import api from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "sonner"

export const useAuthRegister = () => {
    const navigate = useNavigate()
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post("/api/v1/auth/register", formData)
      return data.user
    },
    onSuccess: () => {
      toast.success("User registered successfully")
      navigate("/login")
    },
    onError: (error: any) => {
      console.error(error)
      toast.error(error?.response?.data?.message ?? "An error occurred")
    },
  })
}

export const useAuthLogin = () =>{
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async(formData:{email:string; password:string;username?:string }={email:"", password:"", username:""}) =>{
            const { data } = await api.post("/api/v1/auth/login", formData)
            return data.user
        },
        onSuccess: () => {
            toast.success("User logged in successfully")
            navigate("/")
        },
        onError: (error: any) => {
            console.error(error)
            toast.error(error?.response?.data?.message ?? "An error occurred")
        }
    })
}