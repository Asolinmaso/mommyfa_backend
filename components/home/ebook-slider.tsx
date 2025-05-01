"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

type Ebook = {
  _id: string
  title: string
  slug: string
  image: string
  description: string
}

export default function EbookSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/ebooks")

        if (!response.ok) {
          throw new Error(`Error fetching ebooks: ${response.status}`)
        }

        const data = await response.json()

        if (data.success) {
          setEbooks(data.ebooks)
        } else {
          throw new Error(data.message || "Failed to fetch ebooks")
        }
      } catch (error) {
        console.error("Error fetching ebooks:", error)
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchEbooks()
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
    // Instead of showing error, use default ebooks
    const defaultEbooks = [
      {
        _id: "sample-1",
        title: "Organic Cooking Basics",
        slug: "organic-cooking-basics",
        image: "/placeholder.svg?height=280&width=220",
        description: "Learn the fundamentals of cooking with organic ingredients to maximize flavor and nutrition.",
      },
      {
        _id: "sample-2",
        title: "Organic Gardening for Beginners",
        slug: "organic-gardening-beginners",
        image: "/placeholder.svg?height=280&width=220",
        description: "Start your own organic garden with this comprehensive guide for beginners.",
      },
      {
        _id: "sample-3",
        title: "Nutritional Benefits of Organic Foods",
        slug: "nutritional-benefits-organic-foods",
        image: "/placeholder.svg?height=280&width=220",
        description:
          "Discover the science behind the nutritional advantages of choosing organic over conventional foods.",
      },
    ]

    setEbooks(defaultEbooks)
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
            <div key={i} className="flex-shrink-0 w-[220px] h-[350px] bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  // If no ebooks, show default ebooks
  if (ebooks.length === 0) {
    const defaultEbooks = [
      {
        _id: "sample-1",
        title: "Organic Cooking Basics",
        slug: "organic-cooking-basics",
        image: "/placeholder.svg?height=280&width=220",
        description: "Learn the fundamentals of cooking with organic ingredients to maximize flavor and nutrition.",
      },
      {
        _id: "sample-2",
        title: "Organic Gardening for Beginners",
        slug: "organic-gardening-beginners",
        image: "/placeholder.svg?height=280&width=220",
        description: "Start your own organic garden with this comprehensive guide for beginners.",
      },
      {
        _id: "sample-3",
        title: "Nutritional Benefits of Organic Foods",
        slug: "nutritional-benefits-organic-foods",
        image: "/placeholder.svg?height=280&width=220",
        description:
          "Discover the science behind the nutritional advantages of choosing organic over conventional foods.",
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
          {defaultEbooks.map((ebook) => (
            <Link key={ebook._id} href={`/ebooks/${ebook.slug}`} className="flex-shrink-0 w-[220px] group">
              <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-md group-hover:border-[#86C33B] h-full flex flex-col">
                <div className="relative h-[280px] w-full">
                  <Image
                    src={ebook.image || "/placeholder.svg"}
                    alt={ebook.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" className="bg-white bg-opacity-90">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read Now
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-white flex flex-col flex-grow">
                  <h3 className="font-medium text-gray-800 mb-2">{ebook.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{ebook.description}</p>
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
        {ebooks.map((ebook) => (
          <Link key={ebook._id} href={`/ebooks/${ebook.slug}`} className="flex-shrink-0 w-[220px] group">
            <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-md group-hover:border-[#86C33B] h-full flex flex-col">
              <div className="relative h-[280px] w-full">
                <Image
                  src={ebook.image || "/placeholder.svg"}
                  alt={ebook.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="secondary" className="bg-white bg-opacity-90">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Now
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-white flex flex-col flex-grow">
                <h3 className="font-medium text-gray-800 mb-2">{ebook.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{ebook.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
