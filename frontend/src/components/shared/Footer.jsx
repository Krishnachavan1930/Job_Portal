import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Job<span className="text-teal-400">Portal</span>
            </h2>
            <p className="text-slate-300 mb-4 max-w-xs">
              Connecting talented professionals with their dream careers and helping companies find the perfect
              candidates.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-slate-300 hover:text-teal-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-slate-300 hover:text-teal-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-slate-300 hover:text-teal-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/jobs" className="text-slate-300 hover:text-white transition-colors">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="/companies" className="text-slate-300 hover:text-white transition-colors">
                  Companies
                </a>
              </li>
              <li>
                <a href="/about" className="text-slate-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-teal-400 flex-shrink-0" />
                <span className="text-slate-300">123 Job Street, Career City, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-teal-400 flex-shrink-0" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-teal-400 flex-shrink-0" />
                <span className="text-slate-300">info@jobportal.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400 text-sm">
          <p>© 2025 JobPortal. All rights reserved. @Krishna Chavan</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
