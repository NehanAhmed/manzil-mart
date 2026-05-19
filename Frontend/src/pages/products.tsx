// pages/Products.tsx
import { useSearchParams } from 'react-router-dom'
import CategorySidebar from "@/components/category-sidebar"
import ProductGrid from "@/components/product-grid"
import { useFetchProducts } from "@/hooks/useProducts"

const Products = () => {
  const [searchParams] = useSearchParams()

  const query = searchParams.get('q') || undefined
  const category = searchParams.get('category') || undefined

  const { data, isPending } = useFetchProducts({ query, category })

  return (
    <div className="flex gap-4 mt-10 items-start justify-start">
      <CategorySidebar />
      <div className="flex-1">
        {/* Search context label */}
        {query && (
          <p className="text-sm text-muted-foreground mb-4">
            Showing results for <span className="font-medium text-foreground">"{query}"</span>
          </p>
        )}
        <ProductGrid
          products={data || []}
          onProductClick={() => {}}
          isPending={isPending}
        />
      </div>
    </div>
  )
}

export default Products