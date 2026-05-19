export type ProductStatus = 'active' | 'draft' | 'inactive'
export type ProductCategory = 'electronics' | 'fashion' | 'home' | 'beauty' | 'sports' | 'books' | 'toys' | 'automotive' | 'health' | 'jewelry' | 'other' | 'all'

export interface ProductVendor {
  _id: string
  username: string
  email: string
}

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  stock: number
  images: string[]
  category: ProductCategory
  status: ProductStatus
  vendor: ProductVendor
  createdAt: string
  updatedAt: string
}

export interface AdminProductsResponse {
  message: string
  products: Product[]
}