"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setIsScrollingUp(false)
      } else {
        setIsScrollingUp(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Function to handle navigation
  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <header
      className={`sticky ${isScrollingUp ? "top-0" : "-top-24"} z-50 bg-[#86C33B] shadow-md transition-all duration-300 ease-in-out`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-40">
              <Image
                src="/placeholder.svg?height=40&width=160"
                alt="MommyFarm Logo"
                width={160}
                height={40}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-xl">
              <Input
                type="search"
                placeholder="Search for organic products..."
                className="w-full pl-10 pr-4 py-2 border-white focus:border-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/wishlist" className="text-white hover:text-gray-200">
              <Button
                variant="ghost"
                size="icon"
                className="water-drop-btn bg-[#CC6203] text-white hover:bg-[#CC6203]/90 h-9 w-9 rounded-full"
              >
                <Heart size={20} />
              </Button>
            </Link>
            <Link href="/cart" className="text-white hover:text-gray-200 relative">
              <Button
                variant="ghost"
                size="icon"
                className="water-drop-btn bg-[#CC6203] text-white hover:bg-[#CC6203]/90 h-9 w-9 rounded-full"
              >
                <ShoppingCart size={20} />
              </Button>
              <span className="absolute -top-2 -right-2 bg-white text-[#86C33B] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="water-drop-btn bg-[#CC6203] text-white hover:bg-[#CC6203]/90 h-9 w-9 rounded-full p-0 overflow-hidden"
                  >
                    {user.image ? (
                      <Image
                        src={user.image || "/placeholder.svg"}
                        alt={user.name}
                        width={36}
                        height={36}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account ({user.role})</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {user.role === "admin" && (
                    <>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/admin`)}>
                        Admin Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/admin/users`)}>
                        User Management
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/admin/products`)}>
                        Products Management
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/admin/orders`)}>
                        Orders Management
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/admin/payments`)}>
                        Payments Tracking
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/admin/banners`)}>
                        Banners/Hero Slides
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/admin/categories`)}>
                        Categories Management
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/admin/ebooks`)}>
                        E-books Management
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/admin/brands`)}>
                        Brands Management
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/admin/sellers`)}>
                        Seller Approvals
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/admin/messages`)}>
                        Messaging System
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/admin/settings`)}>
                        Settings
                      </DropdownMenuItem>
                    </>
                  )}

                  {user.role === "seller" && (
                    <>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/seller/dashboard`)}>
                        Seller Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/seller/store`)}>
                        Store Management
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/seller/products`)}>
                        Product Management
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/seller/orders`)}>
                        Orders Tracking
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/seller/payments`)}>
                        Payments Tracking
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/seller/customers`)}>
                        Customer Management
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/seller/analytics`)}>
                        Analytics Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/seller/messages`)}>
                        Messaging System
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/seller/kyc`)}>
                        KYC Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/seller/settings`)}>
                        Settings
                      </DropdownMenuItem>
                    </>
                  )}

                  {user.role === "buyer" && (
                    <>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/dashboard`)}>
                        Buyer Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/profile`)}>
                        Profile Management
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/orders`)}>
                        Orders History
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation("/wishlist")}>Wishlist</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/addresses`)}>
                        Address Management
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/subscriptions`)}>
                        Subscriptions
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/payment-methods`)}>
                        Payment Methods
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/wallet`)}>
                        Wallet
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/notifications`)}>
                        Notifications
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/support`)}>
                        Support
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleNavigation(`/${user.username}/settings`)}>
                        Settings
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            )}

            <Link href="/seller/register">
              <Button
                variant="outline"
                size="sm"
                className="water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90"
              >
                Sell on MommyFarm
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/20">
            <div className="flex mb-4">
              <Input type="search" placeholder="Search for organic products..." className="w-full pl-10 pr-4 py-2" />
              <Search className="absolute left-7 top-[5.5rem] transform -translate-y-1/2 text-gray-400" size={18} />
            </div>

            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavigation("/wishlist")}
                className="flex items-center space-x-2 text-white text-left"
              >
                <Heart size={20} />
                <span>Wishlist</span>
              </button>
              <button
                onClick={() => handleNavigation("/cart")}
                className="flex items-center space-x-2 text-white text-left"
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
              </button>

              {user ? (
                <>
                  {user.role === "admin" && (
                    <div className="flex flex-col space-y-2 border-t border-white/20 pt-2">
                      <span className="text-white font-semibold">Admin Menu</span>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/admin`)}
                        className="text-white text-left"
                      >
                        Admin Dashboard
                      </button>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/admin/users`)}
                        className="text-white text-left"
                      >
                        User Management
                      </button>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/admin/products`)}
                        className="text-white text-left"
                      >
                        Products Management
                      </button>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/admin/orders`)}
                        className="text-white text-left"
                      >
                        Orders Management
                      </button>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/admin/payments`)}
                        className="text-white text-left"
                      >
                        Payments Tracking
                      </button>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/admin/settings`)}
                        className="text-white text-left"
                      >
                        Settings
                      </button>
                    </div>
                  )}

                  {user.role === "seller" && (
                    <div className="flex flex-col space-y-2 border-t border-white/20 pt-2">
                      <span className="text-white font-semibold">Seller Menu</span>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/seller/dashboard`)}
                        className="text-white text-left"
                      >
                        Seller Dashboard
                      </button>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/seller/store`)}
                        className="text-white text-left"
                      >
                        Store Management
                      </button>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/seller/products`)}
                        className="text-white text-left"
                      >
                        Product Management
                      </button>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/seller/orders`)}
                        className="text-white text-left"
                      >
                        Orders Tracking
                      </button>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/seller/settings`)}
                        className="text-white text-left"
                      >
                        Settings
                      </button>
                    </div>
                  )}

                  {user.role === "buyer" && (
                    <div className="flex flex-col space-y-2 border-t border-white/20 pt-2">
                      <span className="text-white font-semibold">Buyer Menu</span>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/dashboard`)}
                        className="text-white text-left"
                      >
                        Buyer Dashboard
                      </button>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/profile`)}
                        className="text-white text-left"
                      >
                        Profile Management
                      </button>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/orders`)}
                        className="text-white text-left"
                      >
                        Orders History
                      </button>
                      <button onClick={() => handleNavigation("/wishlist")} className="text-white text-left">
                        Wishlist
                      </button>
                      <button
                        onClick={() => handleNavigation(`/${user.username}/settings`)}
                        className="text-white text-left"
                      >
                        Settings
                      </button>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="justify-start px-0 text-white border-t border-white/20 pt-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => handleNavigation("/login")}
                    className="w-full water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90"
                  >
                    Login
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleNavigation("/register")}
                    className="w-full water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              <Button
                variant="outline"
                onClick={() => handleNavigation("/seller/register")}
                className="w-full water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90"
              >
                Sell on MommyFarm
              </Button>
            </nav>
          </div>
        )}

        {/* Navigation Bar */}
        <nav className="hidden md:flex mt-4 border-t border-white/20 pt-4">
          <ul className="flex space-x-6">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">
                  Organic Fruits & Vegetables
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>50+ Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-2 gap-1">
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/fruits-vegetables/apples")}>
                      Apples
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/fruits-vegetables/tomatoes")}>
                      Tomatoes
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/fruits-vegetables/spinach")}>
                      Spinach
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/fruits-vegetables/carrots")}>
                      Carrots
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/fruits-vegetables/bananas")}>
                      Bananas
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/fruits-vegetables/broccoli")}>
                      Broccoli
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/fruits-vegetables/oranges")}>
                      Oranges
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/fruits-vegetables/potatoes")}>
                      Potatoes
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => handleNavigation("/products/fruits-vegetables")}>
                    View All
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">
                  Organic Grains & Pulses
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>30+ Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-2 gap-1">
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/grains-pulses/rice")}>
                      Rice
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/grains-pulses/wheat")}>
                      Wheat
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/grains-pulses/lentils")}>
                      Lentils
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/grains-pulses/oats")}>
                      Oats
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/grains-pulses/quinoa")}>
                      Quinoa
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/grains-pulses/chickpeas")}>
                      Chickpeas
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/grains-pulses/barley")}>
                      Barley
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/grains-pulses/millet")}>
                      Millet
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => handleNavigation("/products/grains-pulses")}>
                    View All
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">Organic Dairy</DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>20+ Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-2 gap-1">
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/dairy/milk")}>Milk</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/dairy/cheese")}>
                      Cheese
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/dairy/yogurt")}>
                      Yogurt
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/dairy/butter")}>
                      Butter
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/dairy/ghee")}>Ghee</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/dairy/paneer")}>
                      Paneer
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/dairy/cream")}>
                      Cream
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/dairy/curd")}>Curd</DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => handleNavigation("/products/dairy")}>View All</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">Organic Beverages</DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>50+ Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-2 gap-1">
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/beverages/coffee")}>
                      Coffee
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/beverages/tea")}>
                      Tea
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/beverages/juice")}>
                      Juice
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/beverages/plant-milk")}>
                      Plant-based Milk
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/beverages/smoothies")}>
                      Smoothies
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/beverages/herbal")}>
                      Herbal Drinks
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/beverages/kombucha")}>
                      Kombucha
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/beverages/coconut-water")}>
                      Coconut Water
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => handleNavigation("/products/beverages")}>View All</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">
                  Organic Personal Care
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>150+ Products</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-2 gap-1">
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/personal-care/skincare")}>
                      Skincare
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/personal-care/haircare")}>
                      Haircare
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/personal-care/oral-care")}>
                      Oral Care
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/personal-care/body-care")}>
                      Body Care
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/personal-care/face-wash")}>
                      Face Wash
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/personal-care/shampoo")}>
                      Shampoo
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/personal-care/oils")}>
                      Oils
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/products/personal-care/soaps")}>
                      Soaps
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => handleNavigation("/products/personal-care")}>
                    View All
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">More Categories</DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onSelect={() => handleNavigation("/products/meat-poultry")}>
                    Organic Meat & Poultry
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleNavigation("/products/snacks")}>
                    Organic Snacks
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleNavigation("/products/cleaning")}>
                    Organic Cleaning
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleNavigation("/products/baby")}>
                    Organic Baby Products
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleNavigation("/products/home-living")}>
                    Home & Living
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleNavigation("/products/eco-accessories")}>
                    Eco Accessories
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
