// pages/OrderDetail.tsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  IconArrowLeft, IconMapPin, IconPhone, IconUser,
  IconPackage, IconCreditCard, IconReceipt,
} from '@tabler/icons-react'
import { useFetchSingleOrder } from '@/hooks/useOrder'

// ─── Types ────────────────────────────────────────────────────────────────────

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
type PaymentMethod = 'COD' | 'CARD'

interface OrderItem {
  _id: string
  product: { _id: string; name: string; images?: string[] }
  vendor: { _id: string; username: string }
  quantity: number
  price: number
  status: OrderStatus
}

interface Order {
  _id: string
  status: OrderStatus
  paymentMethod: PaymentMethod
  totalAmount: number
  items: OrderItem[]
  shippingAddress: {
    fullName: string
    phone: string
    address: string
    city: string
  }
  createdAt: string
  updatedAt: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<OrderStatus, { label: string; className: string }> = {
  pending:    { label: 'Pending',    className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  processing: { label: 'Processing', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  shipped:    { label: 'Shipped',    className: 'bg-purple-100 text-purple-800 border-purple-200' },
  delivered:  { label: 'Delivered',  className: 'bg-green-100 text-green-800 border-green-200' },
  cancelled:  { label: 'Cancelled',  className: 'bg-red-100 text-red-800 border-red-200' },
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const OrderDetailSkeleton = () => (
  <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
    <Skeleton className="h-5 w-24" />
    <div className="space-y-2">
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-4 w-32" />
    </div>
    <div className="border rounded-lg p-6 space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-14 w-14 rounded-md shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-32 rounded-lg" />
      <Skeleton className="h-32 rounded-lg" />
    </div>
  </div>
)

// ─── Section Wrapper ──────────────────────────────────────────────────────────

const Section = ({ title, icon: Icon, children }: {
  title: string
  icon: React.ElementType
  children: React.ReactNode
}) => (
  <div className="border rounded-lg overflow-hidden">
    <div className="flex items-center gap-2 px-5 py-3.5 border-b bg-muted/40">
      <Icon className="size-4 text-muted-foreground" />
      <span className="text-sm font-medium">{title}</span>
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
)

// ─── Main Component ───────────────────────────────────────────────────────────

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isPending, isError } = useFetchSingleOrder(id || '')

  if (isPending) return <OrderDetailSkeleton />

  if (isError || !data?.order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
          <Link to="/orders"><IconArrowLeft className="size-4 mr-1" /> Back to Orders</Link>
        </Button>
        <div className="border border-destructive/30 rounded-lg px-5 py-4 text-sm text-destructive">
          Failed to load order details. Please try again.
        </div>
      </div>
    )
  }

  const order: Order = data.order
  const badge = STATUS_BADGE[order.status]

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

      {/* Back */}
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link to="/orders">
          <IconArrowLeft className="size-4 mr-1" /> Back to Orders
        </Link>
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Order <span className="font-mono text-muted-foreground">#{order._id.slice(-8).toUpperCase()}</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Placed on {format(new Date(order.createdAt), 'dd MMM yyyy, hh:mm a')}
          </p>
        </div>
        <Badge
          variant="outline"
          className={`text-xs font-medium shrink-0 ${badge.className}`}
        >
          {badge.label}
        </Badge>
      </div>

      {/* Items */}
      <Section title="Order Items" icon={IconPackage}>
        <div className="space-y-4">
          {order.items.map((item, index) => {
            const itemBadge = STATUS_BADGE[item.status]
            const thumbnail = item.product?.images?.[0]

            return (
              <React.Fragment key={item._id}>
                {index > 0 && <Separator />}
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="size-14 rounded-md border bg-muted shrink-0 overflow-hidden">
                    {thumbnail
                      ? <img src={thumbnail} alt={item.product.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center">
                          <IconPackage className="size-5 text-muted-foreground" />
                        </div>
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product?.name ?? 'Product unavailable'}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Qty: {item.quantity} &nbsp;·&nbsp; Rs. {item.price.toLocaleString()} each
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sold by: <span className="text-foreground">{item.vendor?.username ?? '—'}</span>
                    </p>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-sm font-medium">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${itemBadge.className}`}
                    >
                      {itemBadge.label}
                    </Badge>
                  </div>
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </Section>

      {/* Shipping & Payment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Shipping Address */}
        <Section title="Shipping Address" icon={IconMapPin}>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <IconUser className="size-3.5 text-muted-foreground shrink-0" />
              <span>{order.shippingAddress.fullName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconPhone className="size-3.5 text-muted-foreground shrink-0" />
              <span>{order.shippingAddress.phone}</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <IconMapPin className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                {order.shippingAddress.address}, {order.shippingAddress.city}
              </span>
            </div>
          </div>
        </Section>

        {/* Payment & Summary */}
        <Section title="Payment & Summary" icon={IconCreditCard}>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Method</span>
              <div className="flex items-center gap-1.5">
                <IconCreditCard className="size-3.5 text-muted-foreground" />
                <span className="font-medium">{order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Card'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Items</span>
              <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm font-semibold">
              <div className="flex items-center gap-1.5">
                <IconReceipt className="size-3.5 text-muted-foreground" />
                <span>Total</span>
              </div>
              <span>Rs. {order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </Section>

      </div>
    </div>
  )
}

export default OrderDetailPage