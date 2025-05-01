"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2, Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import { SellerNav } from "@/components/seller/seller-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SellerProductsPage({ params }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Redirect if not seller
    if (!loading && (!user || (user.role !== "seller" && user.role !== "admin"))) {
      router.push("/")
      return
    }

    // Mock data for now
    const mockProducts = [
      {
        _id: "1",
        name: "Organic Baby Food",
        price: 12.99,
        stock: 45,
        category: "Baby Food",
        status: "active",
        createdAt: "2023-01-15",
      },
      {
        _id: "2",
        name: "Baby Diapers Pack",
        price: 24.99,
        stock: 120,
        category: "Diapers",
        status: "active",
        createdAt: "2023-02-20",
      },
      {
        _id: "3",
        name: "Baby Wipes",
        price: 5.99,
        stock: 200,
        category: "Wipes",
        status: "active",
        createdAt: "2023-03-10",
      },
      {
        _id: "4",
        name: "Baby Shampoo",
        price: 8.99,
        stock: 75,
        category: "Bath",
        status: "out_of_stock",
        createdAt: "2023-02-28",
      },
      {
        _id: "5",
        name: "Baby Lotion",
        price: 7.99,
        stock: 0,
        category: "Bath",
        status: "draft",
        createdAt: "2023-04-05",
      },
    ]

    setProducts(mockProducts)
    setIsLoading(false)
  }, [user, loading, router])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
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
      <h1 className="text-2xl font-bold mb-6">My Products</h1>

      <SellerNav />

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link href={`/${user?.username}/seller/products/add`}>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
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
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{product.stock}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{product.category}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : product.status === "out_of_stock"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.status === "active"
                        ? "Active"
                        : product.status === "out_of_stock"
                          ? "Out of Stock"
                          : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
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
