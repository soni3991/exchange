import Link from "next/link";
import { ArrowUpRight, Check, Shield, Lock, RefreshCcw } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gray-900 text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&q=80')] bg-cover bg-center opacity-20" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold mb-8 tracking-tight">
              Anonymous{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">
                Fiat-USDT
              </span>{" "}
              Exchange Platform
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Exchange local currency for USDT without registration, KYC, or
              personal data exposure. Secure, private, and decentralized.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-black bg-yellow-400 rounded-lg hover:bg-yellow-300 transition-colors text-lg font-medium"
              >
                Start Anonymous Exchange
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center px-8 py-4 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium"
              >
                How It Works
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-yellow-400" />
                <span>No registration required</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-yellow-400" />
                <span>Smart contract security</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCcw className="w-5 h-5 text-yellow-400" />
                <span>Instant exchanges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
