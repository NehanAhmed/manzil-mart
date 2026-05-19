// hooks/useProducts.ts
import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import type { AdminProductsResponse } from "@/types/product.types"

interface ProductFilters {
  query?: string
  category?: string
  page?: number
}

export const useFetchProducts = (filters: ProductFilters = {}) => {
  const { query, category, page = 1 } = filters
  const hasFilters = !!query || !!category

  return useQuery({
    queryKey: ['products', query, category, page], // refetches when these change
    queryFn: async () => {
      if (hasFilters) {
        const params = new URLSearchParams()
        if (query) params.set('query', query)
        if (category) params.set('category', category)
        params.set('page', String(page))

        const result = await api.get(`/product/filter?${params.toString()}`)
        return result.data.products
      }

      const result = await api.get('/product/fetch')
      return result.data.products
    },
  })
}

export const useFetchSingleProduct = (id:string) =>{
  return useQuery({
    queryKey:['productDetail', id],
    queryFn: async () => {
      const result = await api.get(`/product/fetch/${id}`)
      return result.data.product
    }
  })
}

export const useAdminProducts = (page = 1) => {
  return useQuery({
    queryKey: ['adminProducts', page],
    queryFn: async () => {
      const result = await api.get<AdminProductsResponse>(`/admin/fetch-all-products?page=${page}&limit=10`)
      return result.data
    },
  })
}