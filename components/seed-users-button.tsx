"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function SeedUsersButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSeedUsers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/seed/users", {
        method: "POST",
      })
      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Default users created successfully",
        })
      } else {
        toast({
          title: "Note",
          description: data.message,
          variant: "default",
        })
      }
    } catch (error) {
      console.error("Error seeding users:", error)
      toast({
        title: "Error",
        description: "Failed to create default users",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSeedUsers} disabled={isLoading} className="bg-[#86C33B] hover:bg-[#75B22F] text-white">
      {isLoading ? "Creating Users..." : "Create Default Users"}
    </Button>
  )
}
