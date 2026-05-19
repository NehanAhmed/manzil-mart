// lib/validators/auth.ts
import { z } from "zod"

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  bio: z.string().max(200, "Bio too long").optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  profilePicture: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files: FileList | undefined) => !files?.length || files[0].size <= 5 * 1024 * 1024,
      "Max file size is 5MB"
    ),
}).refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().optional(),
})

export const applyForVendorSchema = z.object({
  storeName:z.string().min(3, "Store name must be at least 3 characters"),
  storeDescription:z.string().min(3, "Store description must be at least 3 characters"),
  phoneNumber:z.string().min(10, "Phone number must be at least 10 characters"),
  storeType:z.string().min(3, "Store type must be at least 3 characters"),
})

export type RegisterFormValues = z.infer<typeof registerSchema>
export type LoginFormValues = z.infer<typeof loginSchema>
export type ApplyForVendorFormValues = z.infer<typeof applyForVendorSchema>