"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Banner = {
  _id: string
  title: string
  image: string
  link: string
}

export default function AdSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [adSlides, setAdSlides] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAdSlides = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/banners?type=ad")

        if (!response.ok) {
          throw new Error(`Error fetching ad slides: ${response.status}`)
        }

        const data = await response.json()

        if (data.success) {
          setAdSlides(data.banners)
        } else {
          throw new Error(data.message || "Failed to fetch ad slides")
        }
      } catch (error) {
        console.error("Error fetching ad slides:", error)
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchAdSlides()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === adSlides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? adSlides.length - 1 : prev - 1))
  }

  // Auto-rotate slides
  useEffect(() => {
    if (adSlides.length === 0) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [currentSlide, adSlides.length])

  // If there's an error, show error message
  if (error) {
    // Instead of showing error, use default slides
    const defaultSlides = [
      {
        _id: "default-ad-1",
        title: "Special Offer on Dry Fruits",
        image: "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=1200&auto=format&fit=crop",
        link: "/products/dry-fruits",
      },
      {
        _id: "default-ad-2",
        title: "New Arrivals: Fresh Juices",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=1200&auto=format&fit=crop",
        link: "/products/juices",
      },
      {
        _id: "default-ad-3",
        title: "Organic Gift Hampers",
        image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=1200&auto=format&fit=crop",
        link: "/gift-hampers",
      },
    ]

    setAdSlides(defaultSlides)
    setLoading(false)
    setError(null)
    return null
  }

  // If loading, show loading state
  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-lg h-[120px] md:h-[150px] lg:h-[200px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  // If no slides, show default ad
  if (adSlides.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-lg h-[120px] md:h-[150px] lg:h-[200px] bg-[#86C33B]/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4">
            <h3 className="text-xl font-bold text-[#86C33B] mb-2">Special Offers</h3>
            <p className="text-gray-700">Check out our latest deals on organic products!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-lg h-[120px] md:h-[150px] lg:h-[200px]">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {adSlides.map((slide) => (
          <div key={slide._id} className="min-w-full relative">
            <a href={slide.link}>
              <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
            </a>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full h-8 w-8"
        onClick={prevSlide}
      >
        <ChevronLeft size={16} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full h-8 w-8"
        onClick={nextSlide}
      >
        <ChevronRight size={16} />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {adSlides.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 w-1.5 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
