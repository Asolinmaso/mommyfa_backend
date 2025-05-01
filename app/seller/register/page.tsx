"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SellerRegistrationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Business Information
    businessName: "",
    businessType: "individual",
    gstNumber: "",
    panNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Bank Details
    accountName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",

    // Product Information
    productCategories: [] as string[],
    productDescription: "",

    // Terms and Conditions
    agreeTerms: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleMultiSelectChange = (name: string, value: string) => {
    const currentValues = formData[name as keyof typeof formData] as string[]

    if (Array.isArray(currentValues)) {
      if (currentValues.includes(value)) {
        setFormData({
          ...formData,
          [name]: currentValues.filter((v) => v !== value),
        })
      } else {
        setFormData({
          ...formData,
          [name]: [...currentValues, value],
        })
      }
    }
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (
          !formData.fullName ||
          !formData.email ||
          !formData.phone ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          toast({
            title: "Missing information",
            description: "Please fill in all required fields",
            variant: "destructive",
          })
          return false
        }
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Passwords do not match",
            description: "Please make sure your passwords match",
            variant: "destructive",
          })
          return false
        }
        return true

      case 2:
        if (
          !formData.businessName ||
          !formData.businessType ||
          !formData.address ||
          !formData.city ||
          !formData.state ||
          !formData.pincode
        ) {
          toast({
            title: "Missing information",
            description: "Please fill in all required fields",
            variant: "destructive",
          })
          return false
        }
        return true

      case 3:
        if (!formData.accountName || !formData.accountNumber || !formData.ifscCode || !formData.bankName) {
          toast({
            title: "Missing information",
            description: "Please fill in all required fields",
            variant: "destructive",
          })
          return false
        }
        return true

      case 4:
        if (formData.productCategories.length === 0 || !formData.productDescription) {
          toast({
            title: "Missing information",
            description: "Please select at least one product category and provide a description",
            variant: "destructive",
          })
          return false
        }
        return true

      case 5:
        if (!formData.agreeTerms) {
          toast({
            title: "Terms and Conditions",
            description: "Please agree to the terms and conditions to continue",
            variant: "destructive",
          })
          return false
        }
        return true

      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(step)) return

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to register the seller
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setRegistrationComplete(true)

      toast({
        title: "Registration successful",
        description: "Your seller account registration has been submitted for review",
      })
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (registrationComplete) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <CheckCircle className="h-16 w-16 mx-auto text-[#86C33B] mb-4" />
          <h1 className="text-2xl font-bold mb-2">Registration Submitted Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for registering as a seller on MommyFarm. Your application has been submitted for review.
          </p>
          <p className="text-gray-600 mb-6">
            We will review your application and get back to you within 2-3 business days.
          </p>
          <Link href="/">
            <Button className="bg-[#86C33B] hover:bg-[#86C33B]/90">Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Become a Seller on MommyFarm</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepNumber ? "bg-[#86C33B] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNumber}
                </div>
                <span className="text-xs mt-2 text-gray-500">
                  {stepNumber === 1 && "Personal"}
                  {stepNumber === 2 && "Business"}
                  {stepNumber === 3 && "Banking"}
                  {stepNumber === 4 && "Products"}
                  {stepNumber === 5 && "Review"}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
            <div
              className="absolute top-0 left-0 h-1 bg-[#86C33B] transition-all duration-300"
              style={{ width: `${(step - 1) * 25}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Business Information */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Business Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => handleSelectChange("businessType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="proprietorship">Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="llp">Limited Liability Partnership</SelectItem>
                        <SelectItem value="company">Private Limited Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                    <Input id="gstNumber" name="gstNumber" value={formData.gstNumber} onChange={handleInputChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN Number (Optional)</Label>
                    <Input id="panNumber" name="panNumber" value={formData.panNumber} onChange={handleInputChange} />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Business Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Bank Details */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Bank Account Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Holder Name *</Label>
                    <Input
                      id="accountName"
                      name="accountName"
                      value={formData.accountName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ifscCode">IFSC Code *</Label>
                    <Input
                      id="ifscCode"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name *</Label>
                    <Input
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 rounded-md text-sm text-yellow-800">
                  <p>Note: Your bank account details are required for receiving payments from MommyFarm.</p>
                </div>
              </div>
            )}

            {/* Step 4: Product Information */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Product Information</h2>

                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Product Categories *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {[
                        "Vegetables",
                        "Fruits",
                        "Oils",
                        "Dry Fruits",
                        "Juices",
                        "Dairy",
                        "Grains",
                        "Spices",
                        "Other",
                      ].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={category}
                            checked={formData.productCategories.includes(category)}
                            onChange={() => handleMultiSelectChange("productCategories", category)}
                            className="h-4 w-4 rounded border-gray-300 text-[#86C33B] focus:ring-[#86C33B]"
                          />
                          <Label htmlFor={category}>{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productDescription">Tell us about your products *</Label>
                    <Textarea
                      id="productDescription"
                      name="productDescription"
                      value={formData.productDescription}
                      onChange={handleInputChange}
                      placeholder="Describe the products you want to sell on MommyFarm..."
                      rows={5}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Terms and Conditions */}
            {step === 5 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Review and Submit</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Personal Information</h3>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p>
                        <span className="font-medium">Name:</span> {formData.fullName}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {formData.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {formData.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Business Information</h3>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p>
                        <span className="font-medium">Business Name:</span> {formData.businessName}
                      </p>
                      <p>
                        <span className="font-medium">Business Type:</span> {formData.businessType}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span> {formData.address}, {formData.city},{" "}
                        {formData.state}, {formData.pincode}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Product Information</h3>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p>
                        <span className="font-medium">Categories:</span> {formData.productCategories.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="h-4 w-4 mt-1 rounded border-gray-300 text-[#86C33B] focus:ring-[#86C33B]"
                        required
                      />
                      <Label htmlFor="agreeTerms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-[#86C33B] hover:underline">
                          Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-[#86C33B] hover:underline">
                          Privacy Policy
                        </Link>{" "}
                        of MommyFarm. I confirm that all the information provided is accurate and complete.
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-[#86C33B] text-[#86C33B] hover:bg-[#86C33B]/10"
                >
                  Previous
                </Button>
              )}

              {step < 5 ? (
                <Button type="button" onClick={nextStep} className="ml-auto bg-[#86C33B] hover:bg-[#86C33B]/90">
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="ml-auto water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90 hover:text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
