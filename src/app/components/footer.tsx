import { Facebook, Twitter, Instagram } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-blue-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Filters</h3>
            <div className="flex flex-wrap gap-2">
              <Link href="/?category=All" className="hover:underline">
                All
              </Link>
              <Link href="/?category=Electronics" className="hover:underline">
                Electronics
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-300">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-blue-300">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-blue-300">
                <Instagram className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-4 text-sm">
          <p>© 2024 American</p>
        </div>
      </div>
    </footer>
  )
}
