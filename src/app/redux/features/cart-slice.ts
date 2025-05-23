import { Product } from "@/app/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface CartItem {
    product: Product
    quantity: number
}

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
            const { product, quantity } = action.payload
            const existingItem = state.items.find((item) => item.product.id === product.id)

            if (existingItem) {
                existingItem.quantity += quantity
            } else {
                state.items.push({ product, quantity })
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const productId = action.payload
            state.items = state.items.filter((item) => item.product.id !== Number(productId))
        },
        updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            const { productId, quantity } = action.payload
            const item = state.items.find((item) => item.product.id === Number(productId))

            if (item) {
                item.quantity = quantity
            }
        },
        clearCart: (state) => {
            state.items = []
        },
    },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer
