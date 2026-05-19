import type { Product } from "@/types/product.types"
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { IconPlus } from "@tabler/icons-react";
import { useCartStore } from "@/stores/useCartStore";

const AddToCartButton = ({ item, isOnProductCard = false }: { item: Product, isOnProductCard?: boolean }) => {

  const addItem = useCartStore((s)=> s.addItem)

  return isOnProductCard ? (
    <motion.div whileTap={{ scale: 0.90 }}>
      <Button
        size="icon"
        className="rounded-full size-8 shrink-0 bg-orange-500 hover:bg-orange-600 text-white"
        onClick={() => addItem({
          name: item.name,
                  price: item.price,
                  quantity: 1,
                  id: item._id,
                  image: item.images[0],
                  stock: item.stock
                })}
              >
                <IconPlus className="size-4" aria-hidden />
              </Button>
            </motion.div>
  ) : (
    <Button
      className="rounded-full flex items-center gap-2 shrink-0 bg-orange-500 hover:bg-orange-600 text-white"
      onClick={() => addItem({
        name: item.name,
        price: item.price,
        quantity: 1,
        id: item._id,
        image: item.images[0],
        stock: item.stock
      })}
    >
      <p className="text- s">Add To Cart</p>
      <IconPlus className="size-4" aria-hidden />
    </Button>
  )
  
}

export default AddToCartButton