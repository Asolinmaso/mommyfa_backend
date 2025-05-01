"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export const SeedDataButton = () => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSeedData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/seed", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: `Data seeded successfully. Created: ${Object.entries(data.counts)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")}`,
        })
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to seed data",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error seeding data:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred while seeding data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleSeedData} disabled={loading} className="bg-[#86C33B] hover:bg-[#86C33B]/90">
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Seeding Data...
        </>
      ) : (
        "Seed Default Data"
      )}
    </Button>
  )
}

export default SeedDataButton
