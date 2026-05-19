import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { applyForVendorSchema, type ApplyForVendorFormValues } from '../lib/validators/auth.validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useApplyForVendor } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const ApplyForVendor = () => {
  const navigate = useNavigate()
  const { mutate: apply, isPending } = useApplyForVendor()
  const { control, handleSubmit, formState: { errors } } = useForm<ApplyForVendorFormValues>({
    resolver: zodResolver(applyForVendorSchema),
    defaultValues: {
      storeName: '',
      storeDescription: '',
      phoneNumber: '',
      storeType: '',
    },
  })

  const onSubmit = (data: ApplyForVendorFormValues) => {
    apply(data, {
      onSuccess: () => navigate('/dashboard'),
      onError: (error) => {
        console.error('Vendor application failed', error)
        navigate('/vendor/login')
      },
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Apply For Vendor</CardTitle>
          <CardDescription>Enter your details to apply and wait for approval.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                control={control}
                name="storeName"
                render={({ field: { onChange, value, ref } }) => (
                  <Field>
                    <FieldLabel htmlFor="store-name">Store Name</FieldLabel>
                    <Input
                      id="store-name"
                      type="text"
                      ref={ref}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                    {errors.storeName && <p className="text-red-500 text-sm">{errors.storeName.message}</p>}
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="storeDescription"
                render={({ field: { onChange, value, ref } }) => (
                  <Field>
                    <FieldLabel htmlFor="store-description">Store Description</FieldLabel>
                    <Input
                      id="store-description"
                      type="text"
                      ref={ref}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                    {errors.storeDescription && <p className="text-red-500 text-sm">{errors.storeDescription.message}</p>}
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="storeType"
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="store-type">Store Type</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="store-type">
                        <SelectValue placeholder="Select store type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="groceries">Groceries</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="toys">Toys</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="jewelry">Jewelry</SelectItem>
                        <SelectItem value="pets">Pets</SelectItem>
                        <SelectItem value="baby">Baby</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.storeType && <p className="text-red-500 text-sm">{errors.storeType.message}</p>}
                  </Field>
                )}
              />

              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value, ref } }) => (
                  <Field>
                    <FieldLabel htmlFor="phone-number">Phone Number</FieldLabel>
                    <Input
                      id="phone-number"
                      type="tel"
                      ref={ref}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button type="submit" className="w-full mt-6" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Apply'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ApplyForVendor