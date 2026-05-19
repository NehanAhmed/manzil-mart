import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export type cartItems = {
    name: string
    price: number
    quantity: number
    id: string
    image: string
    stock: number
}

export type cartStore = {
    items: cartItems[]
    addItem: (item: cartItems) => void
    removeItem: (id: string) => void
    updateItem: (id: string, quantity: number) => void
    clearCart: () => void
}

export const useCartStore = create<cartStore>()(
    persist(
        (set, get) => ({

            items: [],
            addItem: (item) =>
                set((state) => {
                    const existing = state.items.find((i) => i.id === item.id)
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                        }
                    }
                    return { items: [...state.items, item] }
                }),

            removeItem: (id: string) =>
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id),
                })),

            updateItem: (id: string, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(id) // calling another action via get()
                    return
                }
                set((state) => ({
                    items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
                }))
            },

            clearCart: () => set({ items: [] }),


        }),

        {
            name: 'cart-storage',
            partialize: (state) => ({ items: state.items }), // only persist items, not isOpen
        }
    )
)