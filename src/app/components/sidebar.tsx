"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Slider } from '@/components/ui/slider'
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription
} from '@/components/ui/sheet'

export const Sidebar = () => {
    const { data } = useFetch('https://dummyjson.com/products')
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedBrand, setSelectedBrand] = useState("All")
    const [priceRange, setPriceRange] = useState([0, 1000])

    const categories = ["All", ...new Set(data.map(p => p.category))]
    const brands = ["All", ...new Set(data.map(p => p.brand))]

    const debounceTimer = useRef<NodeJS.Timeout | null>(null)

    // Initialize filters from URL
    useEffect(() => {
        setSelectedCategory(searchParams.get("category") || "All")
        setSelectedBrand(searchParams.get("brand") || "All")
        setPriceRange([
            Number(searchParams.get("priceMin")) || 0,
            Number(searchParams.get("priceMax")) || 1000
        ])
    }, [searchParams])

    const updateURL = (category = selectedCategory, brand = selectedBrand, price = priceRange) => {
        const params = new URLSearchParams()

        if (category !== "All") params.set("category", category)
        if (brand !== "All") params.set("brand", brand)

        params.set("priceMin", price[0].toString())
        params.set("priceMax", price[1].toString())

        router.push(`${pathname}?${params.toString()}`)
    }

    const handleChange = (type: "category" | "brand", value: string) => {
        if (type === "category") setSelectedCategory(value)
        if (type === "brand") setSelectedBrand(value)

        updateURL(
            type === "category" ? value : selectedCategory,
            type === "brand" ? value : selectedBrand,
            priceRange
        )
    }

    const handlePriceChange = (range: number[]) => {
        setPriceRange(range)
        if (debounceTimer.current) clearTimeout(debounceTimer.current)
        debounceTimer.current = setTimeout(() => updateURL(selectedCategory, selectedBrand, range), 300)
    }

    const renderRadioList = (title: string, options: string[], selected: string, type: "category" | "brand") => (
        <div className="mb-6">
            <h3 className="font-semibold mb-2">{title}</h3>
            {options.map(opt => (
                <label key={opt} className="flex items-center mb-1">
                    <input
                        type="radio"
                        name={type}
                        checked={selected === opt}
                        onChange={() => handleChange(type, opt)}
                        className="mr-2"
                    />
                    {opt}
                </label>
            ))}
        </div>
    )

    return (
        <>
            <div className='hidden md:flex flex-col gap-4 '>
                <div className="w-full md:w-64 bg-blue-600 text-white p-4 rounded-md">
                    <h2 className="text-xl font-bold mb-4">Filters</h2>
                    {renderRadioList("Category", categories, selectedCategory, "category")}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Price</h3>
                        <Slider
                            value={priceRange}
                            min={0}
                            max={1000}
                            step={10}
                            onValueChange={handlePriceChange}
                            className="mb-2"
                        />
                        <div className="flex justify-between text-sm">
                            <span>{priceRange[0]}</span>
                            <span>{priceRange[1]}</span>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-64 bg-white p-4 rounded-md">
                    {renderRadioList("Brand", brands, selectedBrand, "brand")}
                </div>
            </div>
            <Sheet>
                <SheetTrigger className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-md">Open Filters</SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-blue-600 text-white md:hidden sm:w-[320px] overflow-auto">
                    <SheetHeader>
                        <SheetTitle className="text-left text-xl font-bold">Filters</SheetTitle>
                        <SheetDescription className="text-left text-white">
                            Refine your product search using category, brand, and price range.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mt-6">
                        {renderRadioList("Category", categories, selectedCategory, "category")}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Price</h3>
                            <Slider
                                value={priceRange}
                                min={0}
                                max={1000}
                                step={10}
                                onValueChange={handlePriceChange}
                                className="mb-2"
                            />
                            <div className="flex justify-between text-sm">
                                <span>{priceRange[0]}</span>
                                <span>{priceRange[1]}</span>
                            </div>
                        </div>
                        {renderRadioList("Brand", brands, selectedBrand, "brand")}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}
