import { useAdminProducts } from "@/hooks/useProducts"
import { format } from "date-fns"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { IconPackage } from "@tabler/icons-react"
import type { ProductStatus } from "@/types/product.types"

const STATUS_BADGE: Record<ProductStatus, { label: string; className: string }> = {
  active:   { label: "Active",   className: "bg-green-100 text-green-800 border-green-200" },
  draft:    { label: "Draft",    className: "bg-gray-100 text-gray-800 border-gray-200" },
  inactive: { label: "Inactive", className: "bg-red-100 text-red-800 border-red-200" },
}

const RowSkeleton = () => (
  <TableRow>
    {Array.from({ length: 7 }).map((_, i) => (
      <TableCell key={i}><Skeleton className="h-4 w-full" /></TableCell>
    ))}
  </TableRow>
)

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <IconPackage className="size-10 text-muted-foreground mb-3" />
    <p className="text-sm font-medium text-foreground">No products found</p>
  </div>
)

export default function AdminProducts() {
  const { data, isPending } = useAdminProducts()
  const products = data?.products ?? []

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage all products across vendors</p>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending
              ? Array.from({ length: 5 }).map((_, i) => <RowSkeleton key={i} />)
              : products.length === 0
              ? (
                <TableRow>
                  <TableCell colSpan={7} className="p-0">
                    <EmptyState />
                  </TableCell>
                </TableRow>
              )
              : products.map((product) => {
                  const badge = STATUS_BADGE[product.status]
                  return (
                    <TableRow key={product._id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-md bg-muted overflow-hidden shrink-0">
                            {product.images[0] ? (
                              <img src={product.images[0]} alt="" className="size-full object-cover" />
                            ) : (
                              <div className="size-full flex items-center justify-center text-muted-foreground">
                                <IconPackage size={16} />
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-medium truncate max-w-[200px]">
                            {product.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground capitalize">
                        {product.category}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        Rs. {product.price.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">
                        <span className={product.stock === 0 ? "text-destructive font-medium" : "text-muted-foreground"}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs font-medium ${badge.className}`}>
                          {badge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {product.vendor?.username ?? "Unknown"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(product.createdAt), "dd MMM yyyy")}
                      </TableCell>
                    </TableRow>
                  )
                })
            }
          </TableBody>
        </Table>
      </div>

      {!isPending && (
        <p className="text-xs text-muted-foreground mt-4">
          Showing {products.length} products
        </p>
      )}
    </div>
  )
}
