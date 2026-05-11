// components/browse-categories.tsx
"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "motion/react";

interface Category {
  name: string;
  image: string; // image URL or import
  href?: string;
}

const CATEGORIES: Category[] = [
  { name: "Fruits & Vegetables", image: "/categories/fruits-vegetables.png" },
  { name: "Personal Care",       image: "/categories/personal-care.png" },
  { name: "Pantry Staples",      image: "/categories/pantry-staples.png" },
  { name: "Bakery",              image: "/categories/bakery.png" },
  { name: "Beverages",           image: "/categories/beverages.png" },
  { name: "Meat & Seafood",      image: "/categories/meat-seafood.png" },
  { name: "Snacks",              image: "/categories/snacks.png" },
  { name: "Frozen Foods",        image: "/categories/frozen-foods.png" },
  { name: "Baby Care",           image: "/categories/baby-care.png" },
];

interface CategoryCardProps {
  category: Category;
  onClick?: (category: Category) => void;
}

function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <motion.button
      onClick={() => onClick?.(category)}
      className="group flex flex-col items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <div className="size-[120px] rounded-[18px] bg-amber-50 flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:bg-amber-100 group-hover:scale-105">
        <img
          src={category.image}
          alt={category.name}
          className="w-[90%] h-[90%] object-contain"
          loading="lazy"
          onError={(e) => {
            // Fallback if image fails
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <span className="text-sm font-medium text-foreground text-center w-[120px] leading-tight whitespace-normal">
        {category.name}
      </span>
    </motion.button>
  );
}

interface BrowseCategoriesProps {
  categories?: Category[];
  title?: string;
  subtitle?: string;
  onCategoryClick?: (category: Category) => void;
}

export function BrowseCategories({
  categories = CATEGORIES,
  title = "Browse Categories",
  subtitle = "Find exactly what you need using",
  onCategoryClick,
}: BrowseCategoriesProps) {
  return (
    <section className="py-8 px-6 mt-20">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>

      <ScrollArea className="w-full">
        <motion.div 
          className="flex gap-4 pb-3"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "tween", 
                duration: 0.4, 
                ease: "easeOut",
                delay: index * 0.06
              }}
            >
              <CategoryCard
                category={category}
                onClick={onCategoryClick}
              />
            </motion.div>
          ))}
        </motion.div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}