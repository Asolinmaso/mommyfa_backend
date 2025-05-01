"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingBag, Heart, CreditCard, Settings, Bell, Truck } from "lucide-react"

export default function BuyerDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "buyer")) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Buyer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Monthly vegetable box</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 back in stock</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders" className="flex items-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center">
            <Heart className="mr-2 h-4 w-4" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>View and manage your recent orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Order #ORD12345</h3>
                      <p className="text-sm text-muted-foreground">Placed on April 15, 2023</p>
                      <div className="flex items-center mt-2">
                        <Truck className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-sm text-green-600">Delivered</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$78.50</p>
                      <p className="text-sm text-muted-foreground">5 items</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Order #ORD12346</h3>
                      <p className="text-sm text-muted-foreground">Placed on April 2, 2023</p>
                      <div className="flex items-center mt-2">
                        <Truck className="h-4 w-4 mr-1 text-amber-600" />
                        <span className="text-sm text-amber-600">In Transit</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$45.20</p>
                      <p className="text-sm text-muted-foreground">3 items</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>Manage your recurring deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Monthly Vegetable Box</h3>
                      <p className="text-sm text-muted-foreground">Delivers on the 1st of every month</p>
                      <div className="flex items-center mt-2">
                        <Bell className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-sm text-green-600">Active</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$45.00/month</p>
                      <p className="text-sm text-muted-foreground">Next: May 1, 2023</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Weekly Fruit Box</h3>
                      <p className="text-sm text-muted-foreground">Delivers every Monday</p>
                      <div className="flex items-center mt-2">
                        <Bell className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-sm text-green-600">Active</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$25.00/week</p>
                      <p className="text-sm text-muted-foreground">Next: April 24, 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>Your Wishlist</CardTitle>
              <CardDescription>Items you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <p>You have 7 items in your wishlist</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods and view transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <p>You have 2 saved payment methods</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Update your profile, addresses, and notification preferences</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
