import type { Metadata } from "next"
import AdminProductsClient from "./AdminProductsClient"

export const metadata: Metadata = {
  title: "Products Management | MommyFarm Admin",
  description: "Manage products on MommyFarm",
}

export default async function AdminProductsPage({ params }: { params: { username: string } }) {
  return <AdminProductsClient params={params} />
}
