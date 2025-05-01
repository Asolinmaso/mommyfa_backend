"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import {
  Users,
  ShoppingBag,
  Package,
  CreditCard,
  BarChart2,
  MessageSquare,
  Settings,
  FileText,
  ImageIcon,
  Tag,
  Book,
  Award,
} from "lucide-react"

export function AdminNav() {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const username = user.username
  const basePath = `/${username}/admin`

  const navItems = [
    { href: `${basePath}`, label: "Dashboard", icon: BarChart2 },
    { href: `${basePath}/users`, label: "Users", icon: Users },
    { href: `${basePath}/products`, label: "Products", icon: ShoppingBag },
    { href: `${basePath}/orders`, label: "Orders", icon: Package },
    { href: `${basePath}/payments`, label: "Payments", icon: CreditCard },
    { href: `${basePath}/banners`, label: "Banners", icon: ImageIcon },
    { href: `${basePath}/categories`, label: "Categories", icon: Tag },
    { href: `${basePath}/ebooks`, label: "E-Books", icon: Book },
    { href: `${basePath}/brands`, label: "Brands", icon: Award },
    { href: `${basePath}/seller-approvals`, label: "Seller Approvals", icon: FileText },
    { href: `${basePath}/messages`, label: "Messages", icon: MessageSquare },
    { href: `${basePath}/settings`, label: "Settings", icon: Settings },
  ]

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <nav className="flex overflow-x-auto pb-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const ImageIcon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md mr-2 whitespace-nowrap ${
                isActive ? "bg-green-100 text-green-800" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
