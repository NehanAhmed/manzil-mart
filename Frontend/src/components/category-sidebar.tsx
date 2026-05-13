import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Button } from './ui/button'

const categories = [
    { name: 'Electronics', icon: '🔌' },
    { name: 'Fashion', icon: '👕' },
    { name: 'Home & Garden', icon: '🏠' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Books', icon: '📚' },
]

const CategorySidebar = () => {
  return (
    <Card className='w-full lg:w-60 ' >
        <CardHeader>
            <h2 className="text-lg font-semibold">Categories</h2>
        </CardHeader>
        <CardContent className='text-start'>
          <div className='space-y-2'>
            {categories.map((category) => (
              <Button key={category.name} variant="outline" className='w-full flex items-center justify-start gap-2'>
                {category.icon} {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className='text-start'>
          <Button variant="outline" className='w-full'>View All Categories</Button>
        </CardFooter>
    </Card>
  )
}

export default CategorySidebar