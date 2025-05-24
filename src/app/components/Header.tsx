"use client"
import { Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export const Header = () => {
    const cart = useSelector((state: RootState) => state.cart)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const query = searchParams.get("search") || ""
        setSearchQuery(query)
    }, [searchParams])

    const updateSearchParams = (query: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (query) {
            params.set("search", query)
        } else {
            params.delete("search")
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateSearchParams(searchQuery)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            updateSearchParams(searchQuery)
        }, 500)
        return () => clearTimeout(timer)
    }, [searchQuery])

    const cartItemsCount = cart.items.reduce(
        (total: number, item: any) => total + item.quantity,
        0
    )

    return (
        <header className="bg-blue-700 text-white">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold">
                    Logo
                </Link>

                <form onSubmit={handleSearchSubmit} className="relative max-w-md w-full mx-4">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full py-2 px-4 pr-10 rounded text-black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        <Search size={18} />
                    </button>
                </form>

                <Link href="/cart" className="relative">
                    <button className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded flex items-center">
                        <ShoppingCart className="mr-2" />
                        Cart
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItemsCount}
                            </span>
                        )}
                    </button>
                </Link>
            </div>
        </header>
    )
}
