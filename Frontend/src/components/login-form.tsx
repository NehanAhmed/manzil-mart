import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuthLogin } from "@/hooks/useAuth"
import { Controller, useForm } from "react-hook-form"
import { loginSchema, type LoginFormValues } from "@/lib/validators/auth.validator"
import { zodResolver } from "@hookform/resolvers/zod"

export function LoginForm({
  className,
  isVendor,
  ...props
}: React.ComponentProps<"div"> & { isVendor?: boolean }) {

  const { mutate: Login, isPending } = useAuthLogin()

  const {control,handleSubmit,formState:{errors}} = useForm<LoginFormValues>({
    resolver:zodResolver(loginSchema),
    defaultValues:{
      username:"",
      email:"",
      password:""
    }
  })

  const onSubmit = (values: LoginFormValues) => {
    Login(values)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      type="text"
                      placeholder="m@example.com"
                      required
                    />
                  )}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      required
                    />
                  )}
                />
              </Field>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Controller 
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="username"
                      type="text"
                        
                    />
                  )}
                />
              </Field>
              {errors.username && (
                <Field>
                  <FieldError>{errors.username.message}</FieldError>
                </Field>
              )}
              {errors.password && (
                <Field>
                  <FieldError>{errors.password.message}</FieldError>
                </Field>
              )}
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Logging in..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="/terms">Terms of Service</a>{" "}
        and <a href="/privacy">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
