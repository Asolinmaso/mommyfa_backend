"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Banner = {
  _id: string
  title: string
  description?: string
  image: string
  link: string
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroSlides, setHeroSlides] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/banners?type=hero")

        if (!response.ok) {
          throw new Error(`Error fetching hero slides: ${response.status}`)
        }

        const data = await response.json()

        if (data.success) {
          setHeroSlides(data.banners)
        } else {
          throw new Error(data.message || "Failed to fetch hero slides")
        }
      } catch (error) {
        console.error("Error fetching hero slides:", error)
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroSlides()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-rotate slides
  useEffect(() => {
    if (heroSlides.length === 0) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, heroSlides.length])

  // If there's an error, show error message
  if (error) {
    // Instead of showing error, use default slides
    const defaultSlides = [
      {
        _id: "default-1",
        title: "Fresh Organic Vegetables",
        description: "Directly from farms to your table",
        image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=1200&auto=format&fit=crop",
        link: "/products/vegetables",
      },
      {
        _id: "default-2",
        title: "Premium Organic Oils",
        description: "Cold-pressed for maximum nutrition",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&auto=format&fit=crop",
        link: "/products/oils",
      },
      {
        _id: "default-3",
        title: "Seasonal Organic Fruits",
        description: "Nature's sweetness in every bite",
        image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200&auto=format&fit=crop",
        link: "/products/fruits",
      },
    ]

    setHeroSlides(defaultSlides)
    setLoading(false)
    setError(null)
    return null
  }

  // If loading, show loading state
  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  // If no slides, show default slide
  if (heroSlides.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px] lg:h-[500px] bg-[#86C33B]/10">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-[#86C33B]">Welcome to MommyFarm</h2>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            Your destination for premium organic products. Explore our range of fresh vegetables, fruits, oils, and
            more.
          </p>
          <Button asChild className="bg-[#CC6203] hover:bg-[#CC6203]/90 water-drop-btn">
            <a href="/products">Shop Now</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px] lg:h-[500px]">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {heroSlides.map((slide) => (
          <div key={slide._id} className="min-w-full relative">
            <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start p-8 md:p-16">
              <h2 className="text-white text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
              {slide.description && <p className="text-white text-lg md:text-xl mb-6">{slide.description}</p>}
              <Button asChild className="bg-[#CC6203] hover:bg-[#CC6203]/90 water-drop-btn">
                <a href={slide.link}>Shop Now</a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full h-10 w-10"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full h-10 w-10"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
