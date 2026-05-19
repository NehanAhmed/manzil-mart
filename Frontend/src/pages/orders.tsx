import { useState } from "react"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { IconPackage, IconSearch, IconArrowRight, IconEye } from "@tabler/icons-react"
import { useOrders, useAdminOrders } from "@/hooks/useOrder"
import { type Order, type OrderStatus } from "@/types/order.types"

const STATUS_OPTIONS: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All Orders", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
]

const STATUS_BADGE: Record<OrderStatus, { label: string; className: string }> = {
  pending:    { label: "Pending",    className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  processing: { label: "Processing", className: "bg-blue-100 text-blue-800 border-blue-200" },
  shipped:    { label: "Shipped",    className: "bg-purple-100 text-purple-800 border-purple-200" },
  delivered:  { label: "Delivered",  className: "bg-green-100 text-green-800 border-green-200" },
  cancelled:  { label: "Cancelled",  className: "bg-red-100 text-red-800 border-red-200" },
}

const RowSkeleton = ({ cells }: { cells: number }) => (
  <TableRow>
    {Array.from({ length: cells }).map((_, i) => (
      <TableCell key={i}><Skeleton className="h-4 w-full" /></TableCell>
    ))}
  </TableRow>
)

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <IconPackage className="size-10 text-muted-foreground mb-3" />
    <p className="text-sm font-medium text-foreground">No orders found</p>
    <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
  </div>
)

export default function OrdersPage({ isAdmin }: { isAdmin?: boolean }) {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")
  const [search, setSearch] = useState("")

  const { data: userData, isError, isPending } = useOrders()
  const { data: adminData, isPending: isAdminPending } = useAdminOrders()

  const data = isAdmin ? adminData : userData
  const loading = isAdmin ? isAdminPending : isPending

  const orders: Order[] = data?.orders ?? data?.order ?? []

  const filtered = orders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesSearch = order._id.toLowerCase().includes(search.toLowerCase()) ||
      (!isAdmin ? false : order.customer?.username?.toLowerCase().includes(search.toLowerCase()))
    return matchesStatus && matchesSearch
  })

  return (
    <div className={isAdmin ? "" : "max-w-5xl mx-auto px-4 py-10"}>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isAdmin ? "All Orders" : "My Orders"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {isAdmin ? "View and manage all orders across vendors" : "Track and manage your purchases"}
        </p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(val) => setStatusFilter(val as OrderStatus | "all")}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isError && !isAdmin && (
        <div className="text-sm text-destructive border border-destructive/30 rounded-md px-4 py-3 mb-6">
          Failed to load orders. Please try again.
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-36">Order ID</TableHead>
              <TableHead>Date</TableHead>
              {isAdmin && <TableHead>Customer</TableHead>}
              {isAdmin && <TableHead>Items</TableHead>}
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              {isAdmin && <TableHead>Shipping</TableHead>}
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <RowSkeleton key={i} cells={isAdmin ? 9 : 7} />)
              : filtered.length === 0
              ? (
                <TableRow>
                  <TableCell colSpan={isAdmin ? 9 : 7} className="p-0">
                    <EmptyState />
                  </TableCell>
                </TableRow>
              )
              : filtered.map((order) => {
                  const badge = STATUS_BADGE[order.status]
                  return (
                    <TableRow key={order._id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        #{order._id.slice(-8).toUpperCase()}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {format(new Date(order.createdAt), "dd MMM yyyy")}
                      </TableCell>
                      {isAdmin && (
                        <TableCell className="text-sm">
                          <div className="flex flex-col">
                            <span className="font-medium">{order.customer?.username ?? "—"}</span>
                            <span className="text-xs text-muted-foreground">{order.customer?.email ?? ""}</span>
                          </div>
                        </TableCell>
                      )}
                      {isAdmin && (
                        <TableCell className="text-sm text-muted-foreground">
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </TableCell>
                      )}
                      <TableCell>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {order.paymentMethod}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs font-medium ${badge.className}`}>
                          {badge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-sm whitespace-nowrap">
                        Rs. {order.totalAmount.toLocaleString()}
                      </TableCell>
                      {isAdmin && (
                        <TableCell className="text-sm text-muted-foreground max-w-[160px]">
                          <div className="flex flex-col text-xs leading-snug">
                            <span>{order.shippingAddress?.fullName ?? "—"}</span>
                            <span className="truncate">{order.shippingAddress?.address ?? ""}</span>
                          </div>
                        </TableCell>
                      )}
                      <TableCell>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/order/${order._id}`}>
                            <IconEye className="size-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
            }
          </TableBody>
        </Table>
      </div>

      {!loading && (
        <p className="text-xs text-muted-foreground mt-4">
          Showing {filtered.length} of {orders.length} orders
        </p>
      )}
    </div>
  )
}
