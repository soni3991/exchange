import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  CheckCircle2,
  Shield,
  Users,
  Zap,
  Lock,
  RefreshCcw,
  DollarSign,
  Clock,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import React from "react";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white h-[4393px]">
      <Navbar />
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Anonymous Fiat-USDT Exchange
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 md:mb-10">
              Exchange local currency for USDT without registration, KYC, or
              personal data exposure.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 sm:px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium text-black bg-yellow-400 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Start Anonymous Exchange
              <ArrowUpRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our decentralized platform connects you with local cash disbursers
              through secure smart contracts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-gray-700 rounded-xl">
              <div className="text-yellow-400 mb-4 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                Select Disburser
              </h3>
              <p className="text-gray-300 text-center">
                Choose from available local disbursers based on location, rates,
                and reputation.
              </p>
            </div>
            <div className="p-6 bg-gray-700 rounded-xl">
              <div className="text-yellow-400 mb-4 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                Smart Contract Escrow
              </h3>
              <p className="text-gray-300 text-center">
                Funds are secured in a time-locked smart contract until payment
                is verified.
              </p>
            </div>
            <div className="p-6 bg-gray-700 rounded-xl">
              <div className="text-yellow-400 mb-4 flex justify-center">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                Receive USDT
              </h3>
              <p className="text-gray-300 text-center">
                Once payment is confirmed, USDT is automatically released to
                your wallet.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Privacy-First Features</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our platform is designed with your privacy and security as the top
              priority.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Lock className="w-6 h-6" />,
                title: "No Registration",
                description:
                  "Device ID-based authentication with no personal data required",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Secure Escrow",
                description: "Smart contract protection for both parties",
              },
              {
                icon: <RefreshCcw className="w-6 h-6" />,
                title: "Encrypted Chat",
                description:
                  "End-to-end encrypted communication between parties",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Time-Locked",
                description:
                  "Automatic transaction resolution with time constraints",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <div className="text-yellow-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 bg-yellow-400 text-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">$10M+</div>
              <div className="text-gray-700">Monthly Volume</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-gray-700">Active Disbursers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-gray-700">Successful Exchanges</div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Exchange Anonymously?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            No registration, no KYC, no personal data exposure. Just secure,
            private exchanges.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-black bg-yellow-400 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Enter Exchange Platform
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
