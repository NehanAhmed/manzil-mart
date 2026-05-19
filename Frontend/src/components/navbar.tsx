// Navbar.tsx
import { IconPin, IconSearch, IconShoppingBag, IconUser } from '@tabler/icons-react'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useUserDetails } from '@/hooks/useUser'
import { DropdownMenuAvatar } from './profile-dropdown'
import { useCartStore } from '@/stores/useCartStore'
import { CartSheet } from './cart-sheet'
import ProductSearchBar from './product-search-bar'

const NavItems = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "Products", link: "/products" },
  { id: 3, title: "Become a Seller", link: "/vendor/register" },
]

const Navbar = () => {
  const { data, isPending, isError } = useUserDetails()
  const itemCount = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.quantity, 0)
  )
  const userLabel = isPending
    ? "Loading..."
    : isError || !data?.user
      ? "Sign In"
      : data.user.username

  return (
    <header className='w-full px-10 py-4 border-b-2'>
      <nav className='max-w-7xl mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <IconPin className='size-6' />
          <h1 className='text-[22px] font-bold text-primary'>Manzil Mart</h1>
        </div>

        <div className='flex items-center justify-center gap-10'>
          <div className='flex items-center justify-center gap-3'>
            {NavItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "tween",
                  duration: 0.4,
                  ease: "easeOut",
                  delay: item.id * 0.06,
                }}
              >
                <Link to={item.link}>
                  <p className='text-sm font-semibold'>{item.title}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <ProductSearchBar />

          {data?.user ? (
            <>
              <div className='flex items-center justify-center gap-4'>
                <DropdownMenuAvatar user={data?.user || { username: "", email: "", avatar: "" }} />
                <div className='relative cursor-pointer'>
                  <CartSheet />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='flex items-center justify-center gap-4'>
                <Link to="/register">
                  <Button>
                    <IconUser />
                    Sign Up
                  </Button>
                </Link>
                <div className='relative cursor-pointer'>
                  <CartSheet />
                </div>
              </div>
            </>
          )}

        </div>
      </nav>
    </header>
  )
}

export default Navbar