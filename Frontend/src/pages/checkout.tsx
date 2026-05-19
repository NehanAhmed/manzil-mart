import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { motion } from 'motion/react'
import { IconMapPin, IconPhone, IconUser, IconBuilding, IconTruck, IconArrowLeft } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { useUserDetails } from '@/hooks/useUser'
import { useCartStore } from '@/stores/useCartStore'
import api from '@/lib/axios'
import { checkoutSchema, type CheckoutForm } from '@/lib/validators/checkout.validator'
import { useCheckout } from '@/hooks/useCheckout'



// ── Field Component ───────────────────────────────────────────────────────────
function Field({
  label,
  icon: Icon,
  error,
  ...props
}: {
  label: string
  icon: React.ElementType
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          {...props}
          className={`pl-10 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

// ── Order Summary ─────────────────────────────────────────────────────────────
function OrderSummary() {
  const items = useCartStore((s) => s.items)
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  const shipping = subtotal >= 50 ? 0 : 4.99
  const total = subtotal + shipping

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Order Summary
      </h2>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium leading-tight line-clamp-1">{item.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold tabular-nums">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Pricing */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>
            {shipping === 0
              ? <span className="font-medium text-emerald-500">Free</span>
              : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-foreground">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment badge */}
      <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5">
        <IconTruck className="size-4 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          Cash on Delivery
        </p>
      </div>
    </div>
  )
}

// ── Checkout Page ─────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const navigate = useNavigate()
  const { data, isPending } = useUserDetails()
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)

  // ── Auth Guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPending && !data?.user) {
      navigate('/login?redirect=/checkout', { replace: true })
    }
  }, [data, isPending, navigate])

  // ── Empty cart guard ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPending && items.length === 0) {
      toast.error('Your cart is empty')
      navigate('/', { replace: true })
    }
  }, [items, isPending, navigate])

  // ── Form ────────────────────────────────────────────────────────────────────
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  })

  // ── Mutation ────────────────────────────────────────────────────────────────
  const { placeOrder, isPending: isOrdering } = useCheckout()

  const onSubmit = (values: CheckoutForm) => {
    placeOrder({
      shippingAddress: {
        fullName: values.fullName,
        phone: values.phone,
        address: values.address,
        city: values.city,
      },
      paymentMethod: 'COD',
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    },{
      onSuccess: () => {
        clearCart()
        toast.success('Order placed successfully!')
        navigate('/orders', { replace: true })
      },
      onError: (err: any) => {
        const message = err?.message || 'Failed to place order. Try again.'
        toast.error(message)
      },
    })
  }

  // ── Loading / Auth pending ──────────────────────────────────────────────────
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!data?.user) return null

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconArrowLeft className="size-4" />
          Back
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-2xl font-bold tracking-tight text-foreground"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">

          {/* ── Left — Shipping Form ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 space-y-5">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Shipping Details
                </h2>

                <Field
                  label="Full Name"
                  icon={IconUser}
                  placeholder="John Doe"
                  error={errors.fullName?.message}
                  {...register('fullName')}
                />

                <Field
                  label="Phone Number"
                  icon={IconPhone}
                  placeholder="+92 300 0000000"
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                <Field
                  label="Address"
                  icon={IconMapPin}
                  placeholder="Street address, apartment, etc."
                  error={errors.address?.message}
                  {...register('address')}
                />

                <Field
                  label="City"
                  icon={IconBuilding}
                  placeholder="Karachi"
                  error={errors.city?.message}
                  {...register('city')}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isOrdering}
              >
                {isOrdering ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Placing Order...
                  </span>
                ) : (
                  'Place Order'
                )}
              </Button>
            </form>
          </motion.div>

          {/* ── Right — Order Summary ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <OrderSummary />
          </motion.div>
        </div>
      </div>
    </div>
  )
}