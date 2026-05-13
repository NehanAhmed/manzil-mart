import { IconPin, IconSearch, IconShoppingBag, IconUser } from '@tabler/icons-react'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
const NavItems = [
    {id:1,title:"Home",link:"/"},
    {id:2,title:"Products",link:"/products"},
    {id:3,title:"Become a Seller",link:"/vendor/register"},
]
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
                      {NavItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ y: 12, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ 
                            type: "tween", 
                            duration: 0.4, 
                            ease: "easeOut",
                            delay: item.id * 0.06
                          }}
                        >
                          <Link to={item.link}><p className='text-sm font-semibold'>{item.title}</p></Link>
                        </motion.div>
                      ))}
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