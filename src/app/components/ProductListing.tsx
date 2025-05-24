"use client"
import React, { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { Product } from '../types'
import { addToCart } from '../redux/features/cart-slice'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const ITEMS_PER_PAGE = 9

const ProductListing = () => {
    const { data, loading } = useFetch('https://dummyjson.com/products')
    const searchParams = useSearchParams()
    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1)

    const categoryFilter = searchParams.get("category")
    const priceMin = Number(searchParams.get("priceMin") || 0)
    const priceMax = Number(searchParams.get("priceMax") || 10000)
    const brandFilter = searchParams.get("brand")
    const searchQuery = searchParams.get("search")

    const filteredProducts = data.filter((product) => {
        if (categoryFilter && categoryFilter !== "All" && product.category !== categoryFilter) return false
        if (product.price < priceMin || product.price > priceMax) return false
        if (brandFilter && brandFilter !== "All" && product.brand !== brandFilter) return false
        if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
        return true
    })

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart({ product, quantity: 1 }))
        toast(`${product.title} added to cart`)
    }

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    return (
        <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Product Listing</h2>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                    <p>No products found matching your criteria.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentProducts.map((product) => (
                            <div key={product.id} className="flex flex-col bg-white rounded-md p-3">
                                <Link href={`/product/${product.id}`}>
                                    <div className="mb-2 flex justify-center">
                                        <Image
                                            src={product.images[0] || "/placeholder.svg"}
                                            width={200}
                                            height={200}
                                            alt={product.title}
                                            className="h-40 object-contain"
                                        />
                                    </div>
                                    <h3 className="font-medium">{product.title}</h3>
                                    <p className="font-bold mb-2">${product.price}</p>
                                </Link>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700 text-white mt-auto"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-4 mt-10">
                        <Button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            variant="outline"
                        >
                            Prev
                        </Button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <Button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            variant="outline"
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default ProductListing
