// components/AccountDialog.tsx
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { IconUser, IconMail, IconShieldCheck, IconLogout } from '@tabler/icons-react'
import { useUserDetails } from '@/hooks/useUser'
import type { User } from '@/types/user.types'
import { useLogoutUser } from '@/hooks/useAuth'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getInitials = (name?: string) => {
    if (!name) return '?'
    return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const AccountSkeleton = () => (
    <div className="space-y-4">
        <div className="flex items-center gap-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
            </div>
        </div>
        <Separator />
        <div className="space-y-3">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
        </div>
    </div>
)

// ─── Row ──────────────────────────────────────────────────────────────────────

const InfoRow = ({ icon: Icon, label, value }: {
    icon: React.ElementType
    label: string
    value?: string
}) => (
    <div className="flex items-center gap-3">
        <Icon className="size-4 text-muted-foreground shrink-0" />
        <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-medium truncate">{value ?? '—'}</p>
        </div>
    </div>
)

interface AccountDialogProps {
    trigger: React.ReactNode
    open: boolean
    data: User
    onOpenChange: (open: boolean) => void
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const AccountDialog = ({ trigger, open, onOpenChange }: AccountDialogProps) => {
    const { data, isPending, isError } = useUserDetails()
    const user = data?.user

    const { mutate: logoutUser } = useLogoutUser()

    const handleLogout = () => {
        logoutUser()    
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-base">Account</DialogTitle>
                </DialogHeader>

                {isPending && <AccountSkeleton />}

                {isError && (
                    <p className="text-sm text-destructive">Failed to load account details.</p>
                )}

                {!isPending && !isError && user && (
                    <div className="space-y-5">
                        {/* Avatar + Name */}
                        <div className="flex items-center gap-4">
                            <Avatar className="size-12">
                                <AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">
                                    {getInitials(user.username)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <p className="font-semibold text-sm truncate">{user.username}</p>
                                <Badge variant="secondary" className="text-xs mt-1 capitalize">
                                    {user.role ?? 'customer'}
                                </Badge>
                            </div>
                        </div>

                        <Separator />

                        {/* Info */}
                        <div className="space-y-4">
                            <InfoRow icon={IconUser} label="Username" value={user.username} />
                            <InfoRow icon={IconMail} label="Email" value={user.email} />
                            <InfoRow icon={IconShieldCheck} label="Account Status" value={user.isVerified ? 'Verified' : 'Unverified'} />
                        </div>

                        <Separator />

                        {/* Actions */}
                        <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 gap-2" onClick={handleLogout}>
                            <IconLogout className="size-4" />
                            Sign Out
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default AccountDialog