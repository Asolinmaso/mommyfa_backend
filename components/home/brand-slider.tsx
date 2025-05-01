"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Brand = {
  _id: string
  name: string
  slug: string
  image: string
}

export default function BrandSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/brands")

        if (!response.ok) {
          throw new Error(`Error fetching brands: ${response.status}`)
        }

        const data = await response.json()

        if (data.success) {
          setBrands(data.brands)
        } else {
          throw new Error(data.message || "Failed to fetch brands")
        }
      } catch (error) {
        console.error("Error fetching brands:", error)
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
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
    // Instead of showing error, use default brands
    const defaultBrands = [
      {
        _id: "sample-1",
        name: "Nature's Basket",
        slug: "natures-basket",
        image: "/placeholder.svg?height=80&width=160",
      },
      {
        _id: "sample-2",
        name: "Organic Valley",
        slug: "organic-valley",
        image: "/placeholder.svg?height=80&width=160",
      },
      {
        _id: "sample-3",
        name: "Green Harvest",
        slug: "green-harvest",
        image: "/placeholder.svg?height=80&width=160",
      },
      {
        _id: "sample-4",
        name: "Pure Earth",
        slug: "pure-earth",
        image: "/placeholder.svg?height=80&width=160",
      },
    ]

    setBrands(defaultBrands)
    setLoading(false)
    setError(null)
    return null
  }

  // If loading, show loading state
  if (loading) {
    return (
      <div className="relative">
        <div className="flex justify-end mb-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8 border-[#86C33B] text-[#86C33B]" disabled>
              <ChevronLeft size={18} />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-[#86C33B] text-[#86C33B]" disabled>
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-shrink-0 w-[200px] h-[120px] bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  // If no brands, show default brands
  if (brands.length === 0) {
    const defaultBrands = [
      {
        _id: "sample-1",
        name: "Nature's Basket",
        slug: "natures-basket",
        image: "/placeholder.svg?height=80&width=160",
      },
      {
        _id: "sample-2",
        name: "Organic Valley",
        slug: "organic-valley",
        image: "/placeholder.svg?height=80&width=160",
      },
      {
        _id: "sample-3",
        name: "Green Harvest",
        slug: "green-harvest",
        image: "/placeholder.svg?height=80&width=160",
      },
      {
        _id: "sample-4",
        name: "Pure Earth",
        slug: "pure-earth",
        image: "/placeholder.svg?height=80&width=160",
      },
    ]

    return (
      <div className="relative">
        <div className="flex justify-end mb-4">
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
          className="flex overflow-x-auto scrollbar-hide gap-6 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {defaultBrands.map((brand) => (
            <Link key={brand._id} href={`/brands/${brand.slug}`} className="flex-shrink-0 group">
              <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-md group-hover:border-[#86C33B] p-4 bg-white h-[120px] w-[200px] flex items-center justify-center">
                <div className="relative h-[80px] w-[160px]">
                  <Image
                    src={brand.image || "/placeholder.svg"}
                    alt={brand.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
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
      <div className="flex justify-end mb-4">
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
        className="flex overflow-x-auto scrollbar-hide gap-6 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {brands.map((brand) => (
          <Link key={brand._id} href={`/brands/${brand.slug}`} className="flex-shrink-0 group">
            <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-md group-hover:border-[#86C33B] p-4 bg-white h-[120px] w-[200px] flex items-center justify-center">
              <div className="relative h-[80px] w-[160px]">
                <Image
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
