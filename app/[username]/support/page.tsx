import type { Metadata } from "next"
import { getServerSession } from "@/lib/server-utils"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Support | MommyFarm",
  description: "Get support on MommyFarm",
}

export default async function SupportPage({ params }: { params: { username: string } }) {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect("/login")
  }

  if (session.user.username !== params.username) {
    redirect("/")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Support</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-4">Welcome to the support page, {session.user.name}!</p>
        <p>
          This page is currently under development. Soon you'll be able to get support and create support tickets here.
        </p>
      </div>
    </div>
  )
}
