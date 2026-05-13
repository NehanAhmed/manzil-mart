import type { Product } from "@/types/product.types";
import { motion } from "motion/react";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

const ProductGrid = ({ products, onAddToCart, onProductClick }: ProductGridProps) => {
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
              key={product.id}
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
                product={product}
                onAddToCart={onAddToCart}
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