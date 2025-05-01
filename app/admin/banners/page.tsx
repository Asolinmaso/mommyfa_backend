"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Plus, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

type Banner = {
  _id: string
  title: string
  description?: string
  image: string
  link: string
  type: "hero" | "ad"
  order: number
  isActive: boolean
}

export default function AdminBannersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentBanner, setCurrentBanner] = useState<Partial<Banner>>({
    title: "",
    description: "",
    image: "",
    link: "",
    type: "hero",
    order: 0,
    isActive: true,
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.role !== "admin") {
      router.push("/")
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      })
      return
    }

    const fetchBanners = async () => {
      try {
        const response = await fetch("/api/banners")
        const data = await response.json()

        if (data.success) {
          setBanners(data.banners)
        }
      } catch (error) {
        console.error("Error fetching banners:", error)
        toast({
          title: "Error",
          description: "Failed to load banners. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [user, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentBanner((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setCurrentBanner((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddBanner = () => {
    setIsEditing(false)
    setCurrentBanner({
      title: "",
      description: "",
      image: "",
      link: "",
      type: "hero",
      order: banners.length,
      isActive: true,
    })
  }

  const handleEditBanner = (banner: Banner) => {
    setIsEditing(true)
    setCurrentBanner(banner)
  }

  const handleDeleteBanner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return

    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        setBanners(banners.filter((banner) => banner._id !== id))
        toast({
          title: "Banner deleted",
          description: "The banner has been deleted successfully.",
        })
      } else {
        throw new Error(data.message || "Failed to delete banner")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to delete banner",
        variant: "destructive",
      })
    }
  }

  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const method = isEditing ? "PUT" : "POST"
      const url = isEditing ? `/api/banners/${currentBanner._id}` : "/api/banners"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentBanner),
      })

      const data = await response.json()

      if (data.success) {
        if (isEditing) {
          setBanners(banners.map((banner) => (banner._id === currentBanner._id ? data.banner : banner)))
        } else {
          setBanners([...banners, data.banner])
        }

        setCurrentBanner({
          title: "",
          description: "",
          image: "",
          link: "",
          type: "hero",
          order: banners.length,
          isActive: true,
        })

        toast({
          title: isEditing ? "Banner updated" : "Banner created",
          description: isEditing
            ? "The banner has been updated successfully."
            : "The banner has been created successfully.",
        })
      } else {
        throw new Error(data.message || `Failed to ${isEditing ? "update" : "create"} banner`)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || `Failed to ${isEditing ? "update" : "create"} banner`,
        variant: "destructive",
      })
    }
  }

  const cancelEdit = () => {
    setCurrentBanner({
      title: "",
      description: "",
      image: "",
      link: "",
      type: "hero",
      order: banners.length,
      isActive: true,
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Manage Banners</h1>
        <div className="h-64 flex items-center justify-center">
          <p>Loading banners...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Banners</h1>
        <Button onClick={handleAddBanner} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Banner
        </Button>
      </div>

      {/* Banner Form */}
      {Object.keys(currentBanner).length > 1 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{isEditing ? "Edit Banner" : "Add New Banner"}</h2>
            <Button variant="ghost" size="icon" onClick={cancelEdit}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSaveBanner} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={currentBanner.title} onChange={handleInputChange} required />
            </div>

            <div>
              <Label htmlFor="link">Link</Label>
              <Input id="link" name="link" value={currentBanner.link} onChange={handleInputChange} required />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                name="description"
                value={currentBanner.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" value={currentBanner.image} onChange={handleInputChange} required />
            </div>

            <div>
              <Label htmlFor="type">Banner Type</Label>
              <Select value={currentBanner.type} onValueChange={(value) => handleSelectChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">Hero Slide</SelectItem>
                  <SelectItem value="ad">Ad Banner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                name="order"
                type="number"
                value={currentBanner.order?.toString()}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={currentBanner.isActive}
                onChange={(e) => setCurrentBanner((prev) => ({ ...prev, isActive: e.target.checked }))}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <Label htmlFor="isActive">Active</Label>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Update Banner" : "Save Banner"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Banners List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="font-semibold">All Banners</h2>
        </div>

        {banners.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No banners found. Add your first banner!</p>
          </div>
        ) : (
          <div className="divide-y">
            {banners.map((banner) => (
              <div key={banner._id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative h-20 w-32 flex-shrink-0">
                  <Image
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium">{banner.title}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    <span className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs mr-2">
                      {banner.type === "hero" ? "Hero Slide" : "Ad Banner"}
                    </span>
                    <span className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs mr-2">
                      Order: {banner.order}
                    </span>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                        banner.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {banner.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1 truncate">Link: {banner.link}</div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditBanner(banner)}
                    className="h-8 w-8 text-blue-600"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteBanner(banner._id)}
                    className="h-8 w-8 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
