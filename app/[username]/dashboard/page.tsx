"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2, Package, Heart, CreditCard, Settings, ShoppingCart } from "lucide-react"
import { BuyerNav } from "@/components/buyer/buyer-nav"

export default function BuyerDashboard({ params }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalOrders: 0,
    wishlistItems: 0,
    cartItems: 0,
    recentOrders: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect if not logged in or not the correct user
    if (!loading && (!user || (user.username !== params.username && user.role !== "admin"))) {
      router.push("/")
      return
    }

    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/buyer")
        const data = await response.json()

        if (data.success) {
          setStats(data.stats)
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchStats()
    }
  }, [user, loading, router, params.username])

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name}!</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            href="/cart"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            View Cart ({stats.cartItems})
          </Link>
        </div>
      </div>

      <BuyerNav />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="w-6 h-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <h2 className="text-gray-500 text-sm">My Orders</h2>
              <p className="text-2xl font-semibold">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-full">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <div className="ml-4">
              <h2 className="text-gray-500 text-sm">Wishlist</h2>
              <p className="text-2xl font-semibold">{stats.wishlistItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <CreditCard className="w-6 h-6 text-purple-500" />
            </div>
            <div className="ml-4">
              <h2 className="text-gray-500 text-sm">Payment Methods</h2>
              <p className="text-2xl font-semibold">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Settings className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="ml-4">
              <h2 className="text-gray-500 text-sm">Account Settings</h2>
              <Link href={`/${user?.username}/settings`} className="text-blue-500 text-sm">
                Manage
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Link href={`/${user?.username}/orders`} className="text-blue-500 hover:text-blue-700 text-sm">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.recentOrders.length > 0 ? (
                stats.recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-4 py-2 whitespace-nowrap">#{order._id.slice(-6)}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2 whitespace-nowrap">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <Link
                        href={`/${user?.username}/orders/${order._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
