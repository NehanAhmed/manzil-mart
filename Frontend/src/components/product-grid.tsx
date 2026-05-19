import type { Product } from "@/types/product.types";
import { motion } from "motion/react";
import { ProductCard } from "./product-card";
import { Skeleton } from "./ui/skeleton";

interface ProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  isPending?: boolean;
}

const productGridSkeleton = () =>{
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="h-48 w-full" />
      ))}
    </div>
  )
}

const ProductGrid = ({ products, onProductClick, isPending }: ProductGridProps) => {
  if(isPending ) return productGridSkeleton()
  return (
    <div>
      {products.length === 0 ? (
        <p className="text-sm text-muted-foreground">No products available.</p>
      ) : (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "tween", 
                duration: 0.4, 
                ease: "easeOut",
                delay: index * 0.06
              }}
            >
              <ProductCard
                isOnProductCard={true}
                product={product}
                onClick={onProductClick}
              />
            </motion.div>
          ))}
        </motion.div> 
      )}
    </div>
  )
}

export default ProductGrid