"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Category = {
  _id: string
  name: string
  slug: string
  image: string
}

export default function CategorySlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/categories")

        if (!response.ok) {
          throw new Error(`Error fetching categories: ${response.status}`)
        }

        const data = await response.json()

        if (data.success) {
          setCategories(data.categories)
        } else {
          throw new Error(data.message || "Failed to fetch categories")
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { current } = sliderRef
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2

      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // If there's an error, show error message
  if (error) {
    // Instead of showing error, use default categories
    const defaultCategories = [
      {
        _id: "vegetables",
        name: "Vegetables",
        slug: "vegetables",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        _id: "fruits",
        name: "Fruits",
        slug: "fruits",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        _id: "oils",
        name: "Oils",
        slug: "oils",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        _id: "dry-fruits",
        name: "Dry Fruits",
        slug: "dry-fruits",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        _id: "juices",
        name: "Juices",
        slug: "juices",
        image: "/placeholder.svg?height=150&width=150",
      },
    ]

    setCategories(defaultCategories)
    setLoading(false)
    setError(null)
    return null
  }

  // If loading, show loading state
  if (loading) {
    return (
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#86C33B]">Shop by Category</h2>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-shrink-0 w-[150px] h-[180px] bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  // If no categories, show default categories
  if (categories.length === 0) {
    const defaultCategories = [
      {
        _id: "vegetables",
        name: "Vegetables",
        slug: "vegetables",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        _id: "fruits",
        name: "Fruits",
        slug: "fruits",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        _id: "oils",
        name: "Oils",
        slug: "oils",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        _id: "dry-fruits",
        name: "Dry Fruits",
        slug: "dry-fruits",
        image: "/placeholder.svg?height=150&width=150",
      },
      {
        _id: "juices",
        name: "Juices",
        slug: "juices",
        image: "/placeholder.svg?height=150&width=150",
      },
    ]

    return (
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#86C33B]">Shop by Category</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[#86C33B] text-[#86C33B]"
              onClick={() => scroll("left")}
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[#86C33B] text-[#86C33B]"
              onClick={() => scroll("right")}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {defaultCategories.map((category) => (
            <Link key={category._id} href={`/products/${category.slug}`} className="flex-shrink-0 w-[150px] group">
              <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-md group-hover:border-[#86C33B]">
                <div className="relative h-[150px] w-[150px]">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-2 text-center bg-white">
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#86C33B]">Shop by Category</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-[#86C33B] text-[#86C33B]"
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={18} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-[#86C33B] text-[#86C33B]"
            onClick={() => scroll("right")}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <Link key={category._id} href={`/products/${category.slug}`} className="flex-shrink-0 w-[150px] group">
            <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-md group-hover:border-[#86C33B]">
              <div className="relative h-[150px] w-[150px]">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-2 text-center bg-white">
                <h3 className="font-medium text-gray-800">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
