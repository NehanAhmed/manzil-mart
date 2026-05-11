import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { motion } from "motion/react";
import type { Product } from "@/types/product.types";

interface PopularProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  onAddToCart?: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

export function PopularProducts({
  products,
  title = "Popular Products",
  subtitle = "Top-rated products this season",
  viewAllHref = "/products",
  onAddToCart,
  onProductClick,
}: PopularProductsProps) {
  return (
    <section className="py-8 px-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <Button
          variant="link"
          className="text-orange-500 hover:text-orange-600 font-medium p-0 h-auto gap-1"
          asChild
        >
          <Link to={viewAllHref}>
            View All <IconArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
      </div>

      {/* Grid */}
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
    </section>
  );
}