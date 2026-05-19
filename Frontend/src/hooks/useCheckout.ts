import { useMutation } from "@tanstack/react-query"
import { checkoutSchema } from "../lib/validators/checkout.validator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import api from "../lib/axios"
import { toast } from "sonner"

export const useCheckout = () => {

    const { mutate: placeOrder, isPending } = useMutation({
        mutationFn: async (data: any) => {
            const { data: response } = await api.post('/order', data)
            return response
        },
        onSuccess: () => {
            toast.success('Order placed successfully')
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    return {
        placeOrder,
        isPending,
    }
}