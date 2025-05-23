"use client"
import React from 'react'
import { useFetch } from '../hooks/useFetch';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Product } from '../types';
import { addToCart } from '../redux/features/cart-slice';
import Link from 'next/link';
import { Star, StarHalf } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ProductListing = () => {
    const { data, loading } = useFetch('https://dummyjson.com/products')
    const searchParams = useSearchParams()
    const dispatch = useDispatch()

    const categoryFilter = searchParams.get("category")
    const priceMin = Number(searchParams.get("priceMin") || 0)
    const priceMax = Number(searchParams.get("priceMax") || 10000)
    const brandFilter = searchParams.get("brand")
    const searchQuery = searchParams.get("search")

    const filteredProducts = data.filter((product) => {
        // Category filter
        if (categoryFilter && categoryFilter !== "All" && product.category !== categoryFilter) {
            return false
        }

        // Price filter
        if (product.price < priceMin || product.price > priceMax) {
            return false
        }

        // Brand filter
        if (brandFilter && brandFilter !== "All" && product.brand !== brandFilter) {
            return false
        }

        // Search query
        if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false
        }

        return true
    })

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart({ product, quantity: 1 }))
    }

    // Special layout for smartphone (as shown in the design)
    const smartphoneProduct = filteredProducts.find((p) => p.title === "Smartphone")
    const regularProducts = filteredProducts.filter((p) => p.title !== "Smartphone")

    return (
        <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Product Listing</h2>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                    <p>No products found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {regularProducts.map((product) => (
                        <div key={product.id} className="flex flex-col bg-white rounded-md p-3">
                            <Link href={`/product/${product.id}`}>
                                <div className="mb-2 flex justify-center">
                                    <Image src={product.images[0] || "/placeholder.svg"} width={200} height={200} alt={product.title} className="h-40 object-contain" />
                                </div>
                                <h3 className="font-medium">{product.title}</h3>
                                <p className="font-bold mb-2">${product.price}</p>
                            </Link>
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white mt-auto"
                                onClick={() => {
                                    handleAddToCart(product)
                                    toast(`${product.title} Added to cart`)
                                }}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    ))}

                </div>
            )}
        </div>
    )
}

export default ProductListing