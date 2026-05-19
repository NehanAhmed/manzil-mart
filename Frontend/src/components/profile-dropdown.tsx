
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconDashboard, IconLogout, IconShoppingBag, IconUser } from "@tabler/icons-react"
import { Link } from "react-router"
import AccountDialog from "./account-modal"
import { useState } from "react"
import type { User } from "@/types/user.types"
import { useLogoutUser } from "@/hooks/useAuth"

export function DropdownMenuAvatar({ user }: { user: User }) {
      const [accountOpen, setAccountOpen] = useState(false)
      const { mutate: logoutUser } = useLogoutUser()

    const handleLogout = () => {
        logoutUser()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                        <AvatarImage src={user.avatar} alt={user.username} />
                        <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    <Link to="/orders">
                        <DropdownMenuItem>
                            <IconShoppingBag />
                            Orders
                        </DropdownMenuItem>
                    </Link>
                    <AccountDialog
                        open={accountOpen}
                        onOpenChange={setAccountOpen}
                        data={user}
                        trigger={
                            <DropdownMenuItem>
                                <IconUser />
                                Account
                            </DropdownMenuItem>
                        }
                    />
                    {user.role === "vendor" && (
                    <Link to="/dashboard">
                        <DropdownMenuItem>
                            <IconDashboard />
                            Dashboard
                        </DropdownMenuItem>
                    </Link>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                  

                <DropdownMenuItem onClick={handleLogout}>
                    <IconLogout />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
