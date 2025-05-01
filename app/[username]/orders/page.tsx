"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2, Search, Eye, RefreshCw, XCircle } from "lucide-react"
import { BuyerNav } from "@/components/buyer/buyer-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function BuyerOrdersPage({ params }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Redirect if not logged in or not the correct user
    if (!loading && (!user || (user.username !== params.username && user.role !== "admin"))) {
      router.push("/")
      return
    }

    // Mock data for now
    const mockOrders = [
      {
        _id: "ORD12345",
        date: "2023-05-15",
        total: 45.99,
        status: "completed",
        items: 3,
        paymentMethod: "Credit Card",
      },
      {
        _id: "ORD12346",
        date: "2023-05-20",
        total: 78.5,
        status: "processing",
        items: 5,
        paymentMethod: "PayPal",
      },
      {
        _id: "ORD12347",
        date: "2023-05-25",
        total: 32.99,
        status: "pending",
        items: 2,
        paymentMethod: "Credit Card",
      },
      {
        _id: "ORD12348",
        date: "2023-05-28",
        total: 124.75,
        status: "shipped",
        items: 7,
        paymentMethod: "Credit Card",
      },
      {
        _id: "ORD12349",
        date: "2023-06-01",
        total: 18.99,
        status: "cancelled",
        items: 1,
        paymentMethod: "Wallet",
      },
    ]

    setOrders(mockOrders)
    setIsLoading(false)
  }, [user, loading, router, params.username])

  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <BuyerNav />

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search orders..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-4 whitespace-nowrap">#{order._id.slice(-5)}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{order.items}</td>
                  <td className="px-4 py-4 whitespace-nowrap">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{order.paymentMethod}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "shipped"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link href={`/${user?.username}/orders/${order._id}`}>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </Link>
                      {order.status === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4" />
                          <span className="sr-only">Cancel</span>
                        </Button>
                      )}
                      {order.status === "completed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-green-500 border-green-200 hover:bg-green-50"
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span className="sr-only">Reorder</span>
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
