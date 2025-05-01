import Link from "next/link"
import Image from "next/image"
import HeroSlider from "@/components/home/hero-slider"
import AdSlider from "@/components/home/ad-slider"
import ProductSlider from "@/components/home/product-slider"
import BrandSlider from "@/components/home/brand-slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="container py-6 space-y-12">
      {/* Hero Slider */}
      <section>
        <HeroSlider />
      </section>

      {/* Product Categories */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-[#86C33B]">Product Categories</h2>

        {/* Organic Food */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-[#CC6203]">🥬 Organic Food</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Fresh Fruits & Vegetables"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Fresh Fruits & Vegetables</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Farm-fresh seasonal produce</li>
                  <li>Pesticide-free cultivation</li>
                  <li>Locally sourced when possible</li>
                </ul>
                <Link href="/products/fruits-vegetables">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Grains & Pulses"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Grains & Pulses</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Whole grains and ancient varieties</li>
                  <li>Protein-rich pulses and legumes</li>
                  <li>Stone-ground flours</li>
                </ul>
                <Link href="/products/grains-pulses">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src="/placeholder.svg?height=200&width=400" alt="Organic Spices" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Organic Spices</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Hand-picked and sun-dried</li>
                  <li>Pure, unadulterated flavors</li>
                  <li>Traditional processing methods</li>
                </ul>
                <Link href="/products/spices">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Organic Baby Products */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-[#CC6203]">🍼 Organic Baby Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src="/placeholder.svg?height=200&width=400" alt="Baby Food" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Baby Food</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>No artificial preservatives</li>
                  <li>Age-appropriate nutrition</li>
                  <li>Gentle on developing digestive systems</li>
                </ul>
                <Link href="/products/baby-food">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Organic Diapers"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Organic Diapers</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Chlorine-free materials</li>
                  <li>Biodegradable options</li>
                  <li>Gentle on sensitive skin</li>
                </ul>
                <Link href="/products/baby-diapers">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Baby Skincare & Oils"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Baby Skincare & Oils</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Hypoallergenic formulations</li>
                  <li>No synthetic fragrances</li>
                  <li>Nourishing natural ingredients</li>
                </ul>
                <Link href="/products/baby-skincare">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Organic Personal Care */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-[#CC6203]">🧖‍♀️ Organic Personal Care</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src="/placeholder.svg?height=200&width=400" alt="Skincare" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Skincare</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Moisturizers & Face Creams</li>
                  <li>Natural Scrubs & Exfoliants</li>
                  <li>Gentle Face Wash & Cleansers</li>
                </ul>
                <Link href="/products/skincare">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src="/placeholder.svg?height=200&width=400" alt="Haircare" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Haircare</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Natural Shampoos & Conditioners</li>
                  <li>Nourishing Hair Oils</li>
                  <li>Herbal Hair Treatments</li>
                </ul>
                <Link href="/products/haircare">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src="/placeholder.svg?height=200&width=400" alt="Oral Care" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Oral Care</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Herbal Toothpaste</li>
                  <li>Natural Mouthwash</li>
                  <li>Bamboo Toothbrushes</li>
                </ul>
                <Link href="/products/oral-care">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <section>
        <AdSlider />
      </section>

      {/* More Categories */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Organic Household Products */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#CC6203]">🧼 Organic Household Products</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/products/all-purpose-cleaners">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="All-purpose Cleaners"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">All-purpose Cleaners</span>
                  </div>
                </div>
              </Link>
              <Link href="/products/dishwashing">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Dishwashing Liquids"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Dishwashing Liquids</span>
                  </div>
                </div>
              </Link>
              <Link href="/products/laundry">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Laundry Detergents"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Laundry Detergents</span>
                  </div>
                </div>
              </Link>
              <Link href="/products/floor-cleaners">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Floor Cleaners"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Floor Cleaners</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Organic Beverages */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#CC6203]">☕ Organic Beverages</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/products/herbal-teas">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Herbal Teas"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Herbal Teas</span>
                  </div>
                </div>
              </Link>
              <Link href="/products/organic-coffee">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Organic Coffee"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Organic Coffee</span>
                  </div>
                </div>
              </Link>
              <Link href="/products/detox-juices">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Detox Juices"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Detox Juices</span>
                  </div>
                </div>
              </Link>
              <Link href="/products/plant-milk">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Almond & Oat Milk"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Almond & Oat Milk</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Eco Accessories */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#CC6203]">🧳 Eco Accessories</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/products/bamboo-brushes">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Bamboo Brushes"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Bamboo Brushes</span>
                  </div>
                </div>
              </Link>
              <Link href="/products/reusable-straws">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Reusable Straws"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Reusable Straws</span>
                  </div>
                </div>
              </Link>
              <Link href="/products/cotton-bags">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Cotton Bags"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Cotton Bags</span>
                  </div>
                </div>
              </Link>
              <Link href="/products/face-masks">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Organic Face Masks"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Organic Face Masks</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Home & Living */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#CC6203]">🛋️ Home & Living</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/products/bedsheets-towels">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Organic Bedsheets & Towels"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Bedsheets & Towels</span>
                  </div>
                </div>
              </Link>
              <Link href="/products/soy-candles">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Soy Candles"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Soy Candles</span>
                  </div>
                </div>
              </Link>
              <Link href="/products/air-fresheners">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Plant-Based Air Fresheners"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Air Fresheners</span>
                  </div>
                </div>
              </Link>
              <Link href="/products/storage-containers">
                <div className="relative h-32 rounded-lg overflow-hidden group">
                  <Image
                    src="/placeholder.svg?height=150&width=200"
                    alt="Biodegradable Storage Containers"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                    <span className="text-white font-medium">Storage Containers</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Themes */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-[#CC6203]">🎨 Shop by Themes</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/themes/new-arrivals">
            <div className="relative h-40 rounded-lg overflow-hidden group">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="New Arrivals"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-4">
                <h4 className="font-medium text-white text-lg">New Arrivals</h4>
                <p className="text-sm text-white">Latest certified organic products</p>
              </div>
            </div>
          </Link>

          <Link href="/themes/gifts">
            <div className="relative h-40 rounded-lg overflow-hidden group">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Gifts for Green Lovers"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-4">
                <h4 className="font-medium text-white text-lg">Gifts for Green Lovers</h4>
                <p className="text-sm text-white">Eco-conscious gift sets</p>
              </div>
            </div>
          </Link>

          <Link href="/themes/detox">
            <div className="relative h-40 rounded-lg overflow-hidden group">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Detox & Clean Living"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-4">
                <h4 className="font-medium text-white text-lg">Detox & Clean Living</h4>
                <p className="text-sm text-white">Wellness-focused organic bundles</p>
              </div>
            </div>
          </Link>

          <Link href="/themes/nature">
            <div className="relative h-40 rounded-lg overflow-hidden group">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Back to Nature"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-4">
                <h4 className="font-medium text-white text-lg">Back to Nature</h4>
                <p className="text-sm text-white">Nature-inspired collections</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Brand Partnerships */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-[#CC6203]">🤝 Brand Partnerships</h3>
        <p className="text-gray-700">
          Featuring organic brands like Organic India, Forest Essentials, Eco Roots, Mamaearth, Khadi Naturals, and
          more.
        </p>
        <BrandSlider />
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Featured Products</h2>
        <ProductSlider category="vegetables" />
      </section>

      {/* User Engagement */}
      <section className="bg-gray-50 p-8 rounded-lg">
        <h3 className="text-2xl font-semibold text-[#CC6203] mb-6">👤 Join Our Organic Community</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xl font-medium">For Customers</h4>
            <p className="text-gray-700">
              Join our community of conscious consumers and get access to exclusive deals, early product launches, and
              educational content.
            </p>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-[#86C33B] text-[#86C33B] hover:bg-[#86C33B] hover:text-white"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#86C33B] hover:bg-[#86C33B]/90">Sign Up</Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-medium">For Sellers</h4>
            <p className="text-gray-700">
              Are you an organic farmer or producer? Join our marketplace and reach thousands of customers looking for
              authentic organic products.
            </p>
            <Link href="/seller/register">
              <Button className="bg-[#CC6203] hover:bg-[#CC6203]/90">Start Selling Your Organic Products</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
