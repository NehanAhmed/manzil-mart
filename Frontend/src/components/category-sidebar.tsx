import { useSearchParams } from 'react-router-dom'
import { Card, CardContent, CardHeader } from './ui/card'
import { Button } from './ui/button'

const categories = [
  { name: 'All',         value: 'all',        icon: '🛍️' },
  { name: 'Electronics', value: 'electronics', icon: '🔌' },
  { name: 'Fashion',     value: 'fashion',     icon: '👕' },
  { name: 'Home',        value: 'home',        icon: '🏠' },
  { name: 'Beauty',      value: 'beauty',      icon: '💄' },
  { name: 'Sports',      value: 'sports',      icon: '⚽' },
  { name: 'Books',       value: 'books',       icon: '📚' },
  { name: 'Toys',        value: 'toys',        icon: '🧸' },
  { name: 'Automotive',  value: 'automotive',  icon: '🚗' },
  { name: 'Health',      value: 'health',      icon: '💊' },
  { name: 'Jewelry',     value: 'jewelry',     icon: '💍' },
  { name: 'Other',       value: 'other',       icon: '📦' },
]

const CategorySidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'

  const handleCategory = (value: string) => {
    setSearchParams((prev) => {
      if (value === 'all') {
        prev.delete('category') // clean URL — no ?category=all
      } else {
        prev.set('category', value)
      }
      return prev // preserves existing ?q= if present
    })
  }

  return (
    <Card className='w-full lg:w-60 shrink-0'>
      <CardHeader>
        <h2 className="text-lg font-semibold">Categories</h2>
      </CardHeader>
      <CardContent className='text-start'>
        <div className='space-y-2'>
          {categories.map((category) => {
            const isActive = activeCategory === category.value

            return (
              <Button
                key={category.value}
                variant={isActive ? 'default' : 'outline'}
                className='w-full flex items-center justify-start gap-2'
                onClick={() => handleCategory(category.value)}
              >
                {category.icon} {category.name}
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default CategorySidebar