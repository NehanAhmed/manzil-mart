import { IconClock, IconLeaf, IconPlayCard, IconShieldCheck, IconTruckDelivery } from '@tabler/icons-react'
import { Card, CardContent } from './ui/card'
import { motion } from 'motion/react'

const TrustBadge = () => {
    const trustBadges = [
        {
            icon: <IconTruckDelivery />,
            title: 'Free Delivery',
            description: 'On orders over $50'
        },
        {
            icon: <IconLeaf />,
            title: '100% Organic',
            description: 'Certified Products'
        },
        {
            icon: <IconClock />,
            title: 'Same Day',
            description: 'Express Delivery'
        },
        {
            icon: <IconShieldCheck />,
            title: 'Secure Pay',
            description: 'Safe Checkout'
        }
    ]
    return (
        <motion.div 
            className='py-2 mt-8'
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
        >
            <Card className=''>
                <CardContent className='flex items-center justify-around gap-4'>
                    {trustBadges.map((val:any, index:number) => (
                        <motion.div
                            key={index}
                            initial={{ y: 12, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ 
                                type: "tween", 
                                duration: 0.4, 
                                ease: "easeOut",
                                delay: index * 0.08
                            }}
                        >
                            {val.icon}
                            <div>
                                <h3 className='font-extrabold'>{val.title}</h3>
                                <p className='text-sm'>{val.description}</p>
                            </div>

                        </motion.div>
                    ))}


                </CardContent>
            </Card>
        </motion.div>
    )
}

export default TrustBadge