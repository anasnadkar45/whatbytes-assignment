"use client"

import { useSelector, useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import { removeFromCart, updateQuantity } from "../redux/features/cart-slice"
import { Header } from "../components/Header"
import { Footer } from "../components/footer"
import Image from "next/image"
import { RootState } from "../redux/store"

export default function Cart() {
    const cart = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()

    const handleUpdateQuantity = (productId: string, quantity: number) => {
        dispatch(updateQuantity({ productId, quantity }))
    }

    const handleRemoveItem = (productId: string) => {
        dispatch(removeFromCart(productId))
    }

    const calculateTotal = () => {
        return cart.items.reduce((total: number, item: any) => {
            return total + item.product.price * item.quantity
        }, 0)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

                {cart.items.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="mb-4">Your cart is empty</p>
                        <Link href="/">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Continue Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="md:col-span-2">
                            {cart.items.map((item: any) => (
                                <div key={item.product.id} className="flex border-b py-4 gap-4">
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <Image src={item.product.images[0] || "/placeholder.svg"} width={200} height={100} alt={item.product.title} className="object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">{item.product.title}</h3>
                                        <p className="text-lg font-bold">${item.product.price}</p>
                                        <div className="flex items-center mt-2">
                                            <button
                                                className="border border-gray-300 px-2 py-0.5 rounded-l"
                                                onClick={() => handleUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                            >
                                                -
                                            </button>
                                            <span className="border-t border-b border-gray-300 px-3 py-0.5">{item.quantity}</span>
                                            <button
                                                className="border border-gray-300 px-2 py-0.5 rounded-r"
                                                onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                            <button className="ml-4 text-red-500" onClick={() => handleRemoveItem(item.product.id)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg h-fit">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                                <span>Total</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">Checkout</Button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}
