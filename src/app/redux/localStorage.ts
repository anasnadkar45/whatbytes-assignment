import type { RootState } from "./store"

export const loadState = (): { cart: RootState["cart"] } | undefined => {
  if (typeof window === "undefined") {
    return undefined
  }

  try {
    const serializedState = localStorage.getItem("reduxState")
    if (!serializedState) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error("Error loading state from localStorage:", err)
    return undefined
  }
}
