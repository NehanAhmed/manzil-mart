import { format } from "date-fns"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { IconHelmet, IconCircleCheck, IconX } from "@tabler/icons-react"
import type { Vendor, VendorStatus } from "@/types/vendor.types"
import { usePendingVendors, useUpdateVendorStatus } from "@/hooks/useVendors"

const STATUS_BADGE: Record<VendorStatus, { label: string; className: string }> = {
  pending:   { label: "Pending",   className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  approved:  { label: "Approved",  className: "bg-green-100 text-green-800 border-green-200" },
  rejected:  { label: "Rejected",  className: "bg-red-100 text-red-800 border-red-200" },
  suspended: { label: "Suspended", className: "bg-gray-100 text-gray-800 border-gray-200" },
}

const RowSkeleton = () => (
  <TableRow>
    {Array.from({ length: 6 }).map((_, i) => (
      <TableCell key={i}><Skeleton className="h-4 w-full" /></TableCell>
    ))}
  </TableRow>
)

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <IconHelmet className="size-10 text-muted-foreground mb-3" />
    <p className="text-sm font-medium text-foreground">No pending vendors</p>
    <p className="text-sm text-muted-foreground mt-1">All vendor applications have been reviewed</p>
  </div>
)

export default function AdminVendors() {
  const { data, isPending } = usePendingVendors()
  const { mutate: updateStatus, isPending: isMutating } = useUpdateVendorStatus()

  const vendors: Vendor[] = data?.vendors ?? []

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Vendor Applications</h1>
        <p className="text-sm text-muted-foreground mt-1">Review and approve pending vendor applications</p>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Store Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Store Type</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending
              ? Array.from({ length: 5 }).map((_, i) => <RowSkeleton key={i} />)
              : vendors.length === 0
              ? (
                <TableRow>
                  <TableCell colSpan={7} className="p-0">
                    <EmptyState />
                  </TableCell>
                </TableRow>
              )
              : vendors.map((vendor) => {
                  const badge = STATUS_BADGE[vendor.status]
                  return (
                    <TableRow key={vendor._id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                            <IconHelmet size={16} className="text-muted-foreground" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{vendor.storeName}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                              {vendor.storeDescription}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex flex-col">
                          <span className="font-medium">{vendor.user?.username ?? "—"}</span>
                          <span className="text-xs text-muted-foreground">{vendor.user?.email ?? ""}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground capitalize">
                        {vendor.storeType}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {vendor.phoneNumber}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {format(new Date(vendor.createdAt), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs font-medium ${badge.className}`}>
                          {badge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-700 border-green-300 hover:bg-green-50 hover:text-green-800"
                            disabled={isMutating}
                            onClick={() => updateStatus({ vendorId: vendor._id, status: "approved" })}
                          >
                            <IconCircleCheck className="size-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-700 border-red-300 hover:bg-red-50 hover:text-red-800"
                            disabled={isMutating}
                            onClick={() => updateStatus({ vendorId: vendor._id, status: "rejected" })}
                          >
                            <IconX className="size-4 mr-1" />
                            Reject
                          </Button>
                        </div>
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
          Showing {vendors.length} pending {vendors.length === 1 ? "application" : "applications"}
        </p>
      )}
    </div>
  )
}
