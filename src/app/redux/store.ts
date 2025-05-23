import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./features/cart-slice"
import { loadState } from "./localStorage"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadState(),
})

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
