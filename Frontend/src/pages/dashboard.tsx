import { useAdminDashboard } from "@/hooks/useAdminDashboard"
import { format } from "date-fns"
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  IconUsers, IconHelmet, IconHourglass, IconPackage, IconShoppingCart, IconCurrencyRupee,
} from "@tabler/icons-react"
import { Link } from "react-router"

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

const STATUS_BADGE: Record<OrderStatus, { label: string; className: string }> = {
  pending:    { label: "Pending",    className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  processing: { label: "Processing", className: "bg-blue-100 text-blue-800 border-blue-200" },
  shipped:    { label: "Shipped",    className: "bg-purple-100 text-purple-800 border-purple-200" },
  delivered:  { label: "Delivered",  className: "bg-green-100 text-green-800 border-green-200" },
  cancelled:  { label: "Cancelled",  className: "bg-red-100 text-red-800 border-red-200" },
}

const STAT_CARDS = [
  { key: "totalUsers", label: "Total Users", icon: IconUsers },
  { key: "totalVendors", label: "Approved Vendors", icon: IconHelmet },
  { key: "pendingVendors", label: "Pending Applications", icon: IconHourglass },
  { key: "totalProducts", label: "Total Products", icon: IconPackage },
  { key: "totalOrders", label: "Total Orders", icon: IconShoppingCart },
  { key: "totalRevenue", label: "Total Revenue", icon: IconCurrencyRupee },
] as const

const StatSkeleton = () => (
  <Card size="sm">
    <CardContent className="flex items-center gap-4 py-4">
      <Skeleton className="size-10 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-16" />
      </div>
    </CardContent>
  </Card>
)

export default function Dashboard() {
  const { data, isPending } = useAdminDashboard()
  const stats = data?.stats
  const recentOrders = data?.recentOrders ?? []
  const pendingVendors = data?.recentPendingVendors ?? []

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your store</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {isPending
          ? Array.from({ length: 6 }).map((_, i) => <StatSkeleton key={i} />)
          : STAT_CARDS.map(({ key, label, icon: Icon }) => (
              <Card key={key} size="sm">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{label}</p>
                    <p className="text-lg font-semibold tracking-tight mt-0.5">
                      {key === "totalRevenue"
                        ? `Rs. ${(stats?.[key] ?? 0).toLocaleString()}`
                        : (stats?.[key] ?? 0).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
        }
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <CardTitle>Recent Orders</CardTitle>
            <Link
              to="/admin/orders"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        {Array.from({ length: 4 }).map((__, j) => (
                          <TableCell key={j}><Skeleton className="h-3 w-full" /></TableCell>
                        ))}
                      </TableRow>
                    ))
                  : recentOrders.length === 0
                  ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-sm text-muted-foreground py-8">
                        No recent orders
                      </TableCell>
                    </TableRow>
                  )
                  : recentOrders.map((order: any) => {
                      const badge = STATUS_BADGE[order.status as OrderStatus]
                      return (
                        <TableRow key={order._id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            #{order._id.slice(-8).toUpperCase()}
                          </TableCell>
                          <TableCell className="text-sm">{order.customer?.username ?? "—"}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-xs font-medium ${badge.className}`}>
                              {badge.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-sm font-medium">
                            Rs. {order.totalAmount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      )
                    })
                }
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <CardTitle>Pending Vendors</CardTitle>
            <Link
              to="/admin/vendors"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Store</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Applied</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        {Array.from({ length: 4 }).map((__, j) => (
                          <TableCell key={j}><Skeleton className="h-3 w-full" /></TableCell>
                        ))}
                      </TableRow>
                    ))
                  : pendingVendors.length === 0
                  ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-sm text-muted-foreground py-8">
                        No pending applications
                      </TableCell>
                    </TableRow>
                  )
                  : pendingVendors.map((vendor: any) => (
                      <TableRow key={vendor._id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="text-sm font-medium">{vendor.storeName}</TableCell>
                        <TableCell className="text-sm">{vendor.user?.username ?? "—"}</TableCell>
                        <TableCell className="text-sm text-muted-foreground capitalize">{vendor.storeType}</TableCell>
                        <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                          {format(new Date(vendor.createdAt), "dd MMM")}
                        </TableCell>
                      </TableRow>
                    ))
                }
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
