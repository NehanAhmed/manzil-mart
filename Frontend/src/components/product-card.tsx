;


import { IconStar, IconPlus } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onClick?: (product: Product) => void;
  className?: string;
  bestSeller?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onClick,
  className,
  bestSeller = false,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
    >
      <Card
        onClick={() => onClick?.(product)}
        className={cn(
          "relative overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-md",
          className,
          bestSeller && "border-2 border-orange-500"
        )}
      >
        <div className="flex justify-around items-center ">

          {product.discountPercent > 0 && (
            <Badge className="absolute top-3 left-3 z-10 rounded-full bg-orange-500 hover:bg-orange-500 text-white text-[10px] font-medium px-2 py-0.5 pointer-events-none">
              {product.discountPercent}% OFF
            </Badge>
          )}

          {bestSeller && (
            <Badge className="absolute top-3 left-3 z-10 rounded-full bg-orange-500 hover:bg-orange-500 text-white text-[10px] font-medium px-2 py-0.5 pointer-events-none">
              Best Seller
            </Badge>
          )}
        </div>

        <CardContent className="p-4 flex flex-col gap-2.5">
          {/* Image */}
          <div className="relative h-36 w-full">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain w-full h-full"
              loading="lazy"
            />
          </div>

          {/* Name */}
          <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
            {product.name}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <IconStar className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price + Add button */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-sm font-bold text-foreground">
                ${product.price.toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">/{product.unit}</span>
              <span className="text-xs text-muted-foreground line-through">
                ${product.originalPrice.toFixed(1)}
              </span>
            </div>

            <motion.div whileTap={{ scale: 0.90 }}>
              <Button
                size="icon"
                className="rounded-full size-8 shrink-0 bg-orange-500 hover:bg-orange-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.(product);
                }}
                aria-label={`Add ${product.name} to cart`}
              >
                <IconPlus className="size-4" aria-hidden />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}