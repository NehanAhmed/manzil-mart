import { BrowseCategories } from '@/components/browse-categories'
import { PopularProducts } from '@/components/featured-products'
import { BestSelling } from '@/components/best-selling'
import Hero from '@/components/hero'
import TrustBadge from '@/components/trust-badge'
import React from 'react'
import type { Product } from '@/types/product.types'
import { NewsletterSubscribe } from '@/components/news-letter-subscribe'
import Footer from '@/components/footer'

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Organic Apples',
    image: '/products/apples.jpg',
    rating: 4.5,
    reviewCount: 128,
    price: 4.99,
    originalPrice: 6.99,
    unit: 'lb',
    discountPercent: 29,
    href: '/products/fresh-organic-apples'
  },
  {
    id: '2',
    name: 'Organic Whole Milk',
    image: '/products/milk.jpg',
    rating: 4.8,
    reviewCount: 89,
    price: 5.49,
    originalPrice: 5.49,
    unit: 'gal',
    discountPercent: 0,
    href: '/products/organic-whole-milk'
  },
  {
    id: '3',
    name: 'Fresh Strawberries',
    image: '/products/strawberries.jpg',
    rating: 4.7,
    reviewCount: 203,
    price: 3.99,
    originalPrice: 5.99,
    unit: 'lb',
    discountPercent: 33,
    href: '/products/fresh-strawberries'
  },
  {
    id: '4',
    name: 'Artisan Sourdough Bread',
    image: '/products/bread.jpg',
    rating: 4.6,
    reviewCount: 156,
    price: 4.29,
    originalPrice: 4.29,
    unit: 'loaf',
    discountPercent: 0,
    href: '/products/artisan-sourdough-bread'
  },
  {
    id: '5',
    name: 'Free-Range Eggs',
    image: '/products/eggs.jpg',
    rating: 4.9,
    reviewCount: 267,
    price: 6.99,
    originalPrice: 8.99,
    unit: 'dozen',
    discountPercent: 22,
    href: '/products/free-range-eggs'
  },
  {
    id: '6',
    name: 'Organic Spinach',
    image: '/products/spinach.jpg',
    rating: 4.4,
    reviewCount: 92,
    price: 2.99,
    originalPrice: 3.99,
    unit: 'bag',
    discountPercent: 25,
    href: '/products/organic-spinach'
  },
  {
    id: '7',
    name: 'Greek Yogurt',
    image: '/products/yogurt.jpg',
    rating: 4.7,
    reviewCount: 178,
    price: 4.49,
    originalPrice: 5.49,
    unit: 'cup',
    discountPercent: 18,
    href: '/products/greek-yogurt'
  },
  {
    id: '8',
    name: 'Fresh Salmon Fillet',
    image: '/products/salmon.jpg',
    rating: 4.8,
    reviewCount: 145,
    price: 12.99,
    originalPrice: 15.99,
    unit: 'lb',
    discountPercent: 19,
    href: '/products/fresh-salmon-fillet'
  },
  {
    id: '9',
    name: 'Avocados',
    image: '/products/avocados.jpg',
    rating: 4.5,
    reviewCount: 234,
    price: 2.49,
    originalPrice: 3.49,
    unit: 'each',
    discountPercent: 29,
    href: '/products/avocados'
  },
  {
    id: '10',
    name: 'Organic Honey',
    image: '/products/honey.jpg',
    rating: 4.9,
    reviewCount: 198,
    price: 8.99,
    originalPrice: 8.99,
    unit: 'jar',
    discountPercent: 0,
    href: '/products/organic-honey'
  }
]

const Index = () => {
  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product.name)
    // TODO: Implement cart functionality
  }

  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product.name)
    // TODO: Navigate to product detail page
  }

  return (
    <div>
        <Hero />
        <TrustBadge />
        <BrowseCategories />
        <BestSelling 
          products={mockProducts}
          onAddToCart={handleAddToCart}
          onClick={handleProductClick}
        />
        <PopularProducts 
          products={mockProducts}
          title="Featured Products"
          subtitle="Hand-picked favorites from our collection"
          viewAllHref="/products"
          onAddToCart={handleAddToCart}
          onProductClick={handleProductClick}
        />
        <NewsletterSubscribe
          onSubscribe={async (email) => {
            // await subscribeToNewsletter(email); // your server action
          }}
        />
        <Footer />
    </div>
  )
}

export default Index