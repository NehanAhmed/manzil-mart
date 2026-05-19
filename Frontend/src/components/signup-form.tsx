import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormValues } from "@/lib/validators/auth.validator"
import { useAuthRegister } from "@/hooks/useAuth"
import { useNavigate } from "react-router"

export function SignupForm({
  className,
  isVendor,
  ...props
}: React.ComponentProps<"div"> & { isVendor?: boolean }) {
  const { mutate: register, isPending } = useAuthRegister()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: RegisterFormValues) => {
    const formData = new FormData()
    formData.append("username", values.username)
    formData.append("email", values.email)
    formData.append("password", values.password)
    if (values.bio) formData.append("bio", values.bio)
    if (values.profilePicture?.[0]) {
      formData.append("profilePicture", values.profilePicture[0])
    }

    register(formData, {
      onSuccess: () => {
        if (isVendor) {
          navigate('/vendor/login')
        } else {
          navigate("/login")
        }
      },
      onError: (error) => {
        console.error(error)
      }
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>Enter your details to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>

              {/* Profile Picture */}
              <Controller
                control={control}
                name="profilePicture"
                render={({ field: { onChange, ref } }) => (
                  <Field>
                    <FieldLabel htmlFor="profile-picture">Profile Picture</FieldLabel>
                    <Input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      ref={ref}
                      onChange={(e) => onChange(e.target.files)}
                    />
                    {errors.profilePicture && (
                      <FieldError>{errors.profilePicture.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/* Username */}
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="username">Username*</FieldLabel>
                    <Input id="username" placeholder="john_doe" {...field} />
                    {errors.username && (
                      <FieldError>{errors.username.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/* Bio */}
              <Controller
                control={control}
                name="bio"
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Bio</FieldLabel>
                    <Textarea placeholder="Tell us about yourself" rows={4} {...field} />
                    {errors.bio && (
                      <FieldError>{errors.bio.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email*</FieldLabel>
                    <Input id="email" type="email" placeholder="john.doe@example.com" {...field} />
                    {errors.email && (
                      <FieldError>{errors.email.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/* Password + Confirm */}
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor="password">Password*</FieldLabel>
                        <Input id="password" type="password" {...field} />
                        {errors.password && (
                          <FieldError>{errors.password.message}</FieldError>
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor="confirm-password">Confirm Password*</FieldLabel>
                        <Input id="confirm-password" type="password" {...field} />
                        {errors.confirmPassword && (
                          <FieldError>{errors.confirmPassword.message}</FieldError>
                        )}
                      </Field>
                    )}
                  />
                </Field>
                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
              </Field>

              {/* Submit */}
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating Account..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}