import z from "zod"

export const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Enter a valid phone number')
    .max(15, 'Phone number too long')
    .regex(/^\+?[0-9\s\-()]+$/, 'Invalid phone number'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
})

export type CheckoutForm = z.infer<typeof checkoutSchema>