import { IconStar, IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { motion } from "motion/react";
import type { Product } from "@/types/product.types";

interface BestSellingProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onClick?: (product: Product) => void;
}

export function BestSelling({ products, onAddToCart, onClick }: BestSellingProps) {
  // Sort products by rating and review count for "best selling"
  const bestSellingProducts = [...products]
    .sort((a, b) => {
      const aScore = a.rating * Math.log(a.reviewCount + 1);
      const bScore = b.rating * Math.log(b.reviewCount + 1);
      return bScore - aScore;
    })
    .slice(0, 8);

  return (
    <section className="py-8 px-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Best Selling</h2>
          <p className="text-sm text-muted-foreground mt-1">Top-rated products this season</p>
        </div>
        <Button
          variant="link"
          className="text-orange-500 hover:text-orange-600 font-medium p-0 h-auto gap-1"
          asChild
        >
          <a href="/products">
            View All <IconArrowRight className="size-4" aria-hidden />
          </a>
        </Button>
      </div>

      {/* Grid */}
      {bestSellingProducts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No products available.</p>
      ) : (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
        >
          {bestSellingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="relative"
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
                onClick={onClick}
                bestSeller={true}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
