import type { Metadata } from "next"
import { getServerSession } from "@/lib/server-utils"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Orders Tracking | MommyFarm Seller",
  description: "Track your orders on MommyFarm",
}

export default async function SellerOrdersPage({ params }: { params: { username: string } }) {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect("/login")
  }

  if (session.user.role !== "seller" && session.user.role !== "admin") {
    redirect("/")
  }

  if (session.user.username !== params.username && session.user.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Orders Tracking</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-4">Welcome to your orders tracking page, {session.user.name}!</p>
        <p>This page is currently under development. Soon you'll be able to track all your orders here.</p>
      </div>
    </div>
  )
}
