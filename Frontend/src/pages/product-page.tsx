import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IconArrowLeft, IconMinus, IconPlus, IconPackage, IconShoppingBag } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useCartStore } from '@/stores/useCartStore'
import type { Product } from '@/types/product.types'
import { toast } from 'sonner'
import { useFetchSingleProduct } from '@/hooks/useProducts'
import AddToCartButton from '@/components/add-to-cart-button'



// ── Skeleton ──────────────────────────────────────────────────────────────────
const ProductPageSkeleton = () => (
  <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
    <Skeleton className="h-4 w-24" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-3">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  </div>
)

// ── Image Gallery ─────────────────────────────────────────────────────────────
const ImageGallery = ({ images, name }: { images: string[]; name: string }) => {
  const [active, setActive] = useState(0)

  const safeImages = images?.length ? images : []

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted">
        {safeImages.length > 0 ? (
          <img
            src={safeImages[active]}
            alt={name}
            className="h-full w-full object-cover transition-all duration-300"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <IconPackage className="size-12 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-square overflow-hidden rounded-lg border transition-all ${
                active === i
                  ? 'border-primary ring-1 ring-primary'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <img src={img} alt={`${name} ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Quantity Selector ─────────────────────────────────────────────────────────
const QuantitySelector = ({
  quantity,
  stock,
  onChange,
}: {
  quantity: number
  stock: number
  onChange: (q: number) => void
}) => (
  <div className="flex items-center gap-3">
    <p className="text-sm font-medium text-muted-foreground">Quantity</p>
    <div className="flex items-center rounded-md border border-border">
      <button
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
      >
        <IconMinus className="size-3.5" />
      </button>
      <span className="w-8 text-center text-sm font-medium tabular-nums">{quantity}</span>
      <button
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= stock}
        className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
      >
        <IconPlus className="size-3.5" />
      </button>
    </div>
    <p className="text-xs text-muted-foreground">{stock} available</p>
  </div>
)

// ── Main Page ─────────────────────────────────────────────────────────────────
const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)
  const { data, isPending, isError } = useFetchSingleProduct(id || '')

  const product: Product | undefined = data

  if (isPending) return <ProductPageSkeleton />

  if (isError || !product) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Button variant="ghost" size="sm" asChild className="-ml-2 mb-6">
          <Link to="/products">
            <IconArrowLeft className="size-4 mr-1" /> Back to Products
          </Link>
        </Button>
        <div className="rounded-lg border border-destructive/30 px-5 py-4 text-sm text-destructive">
          Failed to load product. Please try again.
        </div>
      </div>
    )
  }

  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock <= 5

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Back */}
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link to="/products">
            <IconArrowLeft className="size-4 mr-1" /> Back to Products
          </Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* ── Left — Images ───────────────────────────────────────────────── */}
          <ImageGallery images={product.images} name={product.name} />

          {/* ── Right — Details ─────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Category + Status */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize text-xs">
                {product.category}
              </Badge>
              {isOutOfStock && (
                <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
              )}
              {isLowStock && (
                <Badge variant="outline" className="text-xs text-amber-500 border-amber-300">
                  Only {product.stock} left
                </Badge>
              )}
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold tracking-tight text-foreground leading-snug">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-3xl font-bold text-foreground">
              Rs. {product.price.toLocaleString()}
            </p>

            <Separator />

            {/* Description */}
            <div className="space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Description
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Quantity */}
            {!isOutOfStock && (
              <QuantitySelector
                quantity={quantity}
                stock={product.stock}
                onChange={setQuantity}
              />
            )}

         <AddToCartButton  item={product } isOnProductCard={false}   />

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage