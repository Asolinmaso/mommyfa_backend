"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import {
  ShoppingBag,
  Package,
  CreditCard,
  BarChart2,
  MessageSquare,
  Settings,
  Store,
  Users,
  FileText,
} from "lucide-react"

export function SellerNav() {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const username = user.username
  const basePath = `/${username}/seller`

  const navItems = [
    { href: `${basePath}/dashboard`, label: "Dashboard", icon: BarChart2 },
    { href: `${basePath}/store`, label: "My Store", icon: Store },
    { href: `${basePath}/products`, label: "Products", icon: ShoppingBag },
    { href: `${basePath}/orders`, label: "Orders", icon: Package },
    { href: `${basePath}/payments`, label: "Payments", icon: CreditCard },
    { href: `${basePath}/customers`, label: "Customers", icon: Users },
    { href: `${basePath}/analytics`, label: "Analytics", icon: BarChart2 },
    { href: `${basePath}/messages`, label: "Messages", icon: MessageSquare },
    { href: `${basePath}/kyc`, label: "KYC Details", icon: FileText },
    { href: `${basePath}/settings`, label: "Settings", icon: Settings },
  ]

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <nav className="flex overflow-x-auto pb-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md mr-2 whitespace-nowrap ${
                isActive ? "bg-green-100 text-green-800" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
