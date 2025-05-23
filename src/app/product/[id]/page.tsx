"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux"
import { Star, StarHalf } from "lucide-react"
import { Product } from "@/app/types"
import { addToCart } from "@/app/redux/features/cart-slice"
import { Header } from "@/app/components/Header"
import { Footer } from "@/app/components/footer"
import Image from "next/image"
import { useFetch } from "@/app/hooks/useFetch"
import { toast } from "sonner"


export default function ProductDetail() {
    const { data, loading } = useFetch('https://dummyjson.com/products')
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!id || !data.length) return;

        const numericId = Number(id)
        const foundProduct = data.find((p) => p.id === numericId)
        if (foundProduct) {
            setProduct(foundProduct)
        }
    }, [id, data])


    const handleAddToCart = () => {
        if (product) {
            dispatch(
                addToCart({
                    product,
                    quantity,
                }),
            )
        }
    }


    if (!product) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <p>Product not found</p>
                </div>
                <Footer />
            </div>
        )
    }


    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <Image src={product.images[0] || "/placeholder.svg"} width={200} height={200} alt={product.title} className="h-40 object-contain" />
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                        <p className="text-2xl font-bold mb-4">${product.price}</p>

                        <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => {
                                if (i < Math.floor(product.rating || 0)) {
                                    return <Star key={i} className="fill-yellow-400 text-yellow-400 w-5 h-5" />
                                } else if (i === Math.floor(product.rating || 0) && product.rating && product.rating % 1 !== 0) {
                                    return <StarHalf key={i} className="fill-yellow-400 text-yellow-400 w-5 h-5" />
                                } else {
                                    return <Star key={i} className="text-gray-300 w-5 h-5" />
                                }
                            })}
                        </div>

                        <p className="mb-4">{product.description}</p>

                        <div className="mb-4">
                            <p className="font-semibold mb-1">Category</p>
                            <p>{product.category}</p>
                        </div>

                        <div className="mb-6">
                            <p className="font-semibold mb-2">Quantity</p>
                            <div className="flex items-center">
                                <button
                                    className="border border-gray-300 px-3 py-1 rounded-l"
                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                >
                                    -
                                </button>
                                <span className="border-t border-b border-gray-300 px-4 py-1">{quantity}</span>
                                <button
                                    className="border border-gray-300 px-3 py-1 rounded-r"
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full"
                            onClick={() => {
                                handleAddToCart()
                                toast(`${product.title} Added to cart`)
                            }}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
