import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-[#86C33B] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2">123 Organic Lane</p>
              <p className="mb-2">Green City, Earth 12345</p>
              <p className="mb-2">Phone: (123) 456-7890</p>
              <p className="mb-2">Email: info@mommyfarm.com</p>
            </address>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="hover:text-gray-200">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-gray-200">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="hover:text-gray-200">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-gray-200">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-gray-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-gray-200">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="hover:text-gray-200">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-gray-200">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-200">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-gray-200">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">
              Subscribe to our newsletter for the latest updates on organic products and exclusive offers.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
              />
              <Button className="bg-[#CC6203] hover:bg-[#CC6203]/90 water-drop-btn">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} MommyFarm Organic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
