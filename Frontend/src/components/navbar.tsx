import { IconPin, IconSearch, IconShoppingBag, IconUser } from '@tabler/icons-react'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <header className=' w-full px-10 py-4 border-b-2'>
            <nav className='max-w-7xl mx-auto flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <IconPin className='size-6' />
                    <h1 className='text-[22px] font-bold text-primary'>Manzil Mart</h1>
                </div>
                <div className='flex items-center justify-center gap-10'>
                    <div className='flex items-center justify-center gap-3'>
                      <Link to="/"><p className='text-sm font-semibold'>Home</p></Link>
                      <Link to="/products"><p className='text-sm font-semibold'>Products</p></Link>
                      <Link to="/deals"><p className='text-sm font-semibold'>Deals</p></Link>
                    </div>
                    <div className='min-w-112.5 relative'>
                        <IconSearch className='text-black/80 size-5 absolute left-4 top-1/2 transform -translate-y-1/2'/>
                        <Input placeholder='Search for Any Product.' className='pl-12'/>
                    </div>
                    <div className='flex items-center justify-center gap-4'>
                        <IconShoppingBag />
                        <Button><IconUser /> Sign In</Button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar