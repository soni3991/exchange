import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Platform Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-400 hover:text-yellow-400"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-yellow-400"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-yellow-400"
                >
                  Exchange Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-400">
                  Smart Contracts
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-400">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-400">
                  Disburser Network
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-400">
                  Dispute Resolution
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-400">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-400">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-400">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-400">
                  Become a Disburser
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-400">
                  Compliance
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-400">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="text-gray-400 mb-4 md:mb-0">
            © {currentYear} Anonymous Exchange. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-yellow-400">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-yellow-400">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-yellow-400">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
