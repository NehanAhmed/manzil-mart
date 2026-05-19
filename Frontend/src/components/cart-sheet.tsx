import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { IconShoppingBag, IconTrash, IconMinus, IconPlus, IconX } from '@tabler/icons-react'
import { useCartStore } from '@/stores/useCartStore'
import type { cartItems } from '@/stores/useCartStore'
import { Link } from 'react-router'

// ── Cart Item Row ────────────────────────────────────────────────────────────
function CartItemRow({ item }: { item: cartItems }) {
  const removeItem = useCartStore((s) => s.removeItem)
  const updateItem = useCartStore((s) => s.updateItem)

  return (
    <div className="flex gap-4 py-4">
      {/* Image */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium leading-tight text-foreground line-clamp-2">
            {item.name}
          </p>
          <button
            onClick={() => removeItem(item.id)}
            className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
          >
            <IconX className="size-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 rounded-md border border-border">
            <button
              onClick={() => updateItem(item.id, item.quantity - 1)}
              className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
              disabled={item.quantity <= 1}
            >
              <IconMinus className="size-3" />
            </button>
            <span className="w-5 text-center text-sm font-medium tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => updateItem(item.id, item.quantity + 1)}
              className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
              disabled={item.quantity >= item.stock}
            >
              <IconPlus className="size-3" />
            </button>
          </div>

          {/* Price */}
          <p className="text-sm font-semibold text-foreground">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        {/* Stock warning */}
        {item.quantity >= item.stock && (
          <p className="text-xs text-amber-500">Max stock reached</p>
        )}
      </div>
    </div>
  )
}

// ── Empty State ──────────────────────────────────────────────────────────────
function EmptyCart() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <IconShoppingBag className="size-7 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">Your cart is empty</p>
        <p className="mt-1 text-xs text-muted-foreground">Add items to get started</p>
      </div>
    </div>
  )
}

// ── Cart Sheet ───────────────────────────────────────────────────────────────
export function CartSheet() {
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)

  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0)
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  const shipping = subtotal > 0 ? (subtotal >= 50 ? 0 : 4.99) : 0
  const total = subtotal + shipping

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative cursor-pointer">
          <div className="relative">
            <IconShoppingBag className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col sm:max-w-md p-0">
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between border-b border-border px-6 py-4">
          <SheetTitle className="text-base font-semibold">
            Cart
            {itemCount > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
            )}
          </SheetTitle>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive"
            >
              <IconTrash className="size-3" />
              Clear all
            </button>
          )}
        </SheetHeader>

        {/* Items */}
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-border px-6 py-5 space-y-4">
              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0
                      ? <span className="text-emerald-500 font-medium">Free</span>
                      : `$${shipping.toFixed(2)}`
                    }
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <Separator />
                <div className="flex justify-between text-sm font-semibold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */} 
              <Button className="w-full" size="lg" asChild>
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}