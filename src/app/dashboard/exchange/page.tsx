import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Star, DollarSign, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function ExchangePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for disbursers
  const disbursers = [
    {
      id: 1,
      name: "LocalCash NYC",
      location: "New York, NY",
      rating: 4.8,
      exchangeRate: 0.98,
      availableAmount: 5000,
      responseTime: "< 15 min",
    },
    {
      id: 2,
      name: "FastUSDT Miami",
      location: "Miami, FL",
      rating: 4.9,
      exchangeRate: 0.97,
      availableAmount: 10000,
      responseTime: "< 5 min",
    },
    {
      id: 3,
      name: "CryptoSwap LA",
      location: "Los Angeles, CA",
      rating: 4.7,
      exchangeRate: 0.99,
      availableAmount: 7500,
      responseTime: "< 30 min",
    },
    {
      id: 4,
      name: "SecureTrade Chicago",
      location: "Chicago, IL",
      rating: 4.6,
      exchangeRate: 0.96,
      availableAmount: 3000,
      responseTime: "< 20 min",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-900 min-h-screen text-white overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Header Section */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Find a Disburser</h1>
            <p className="text-gray-300">
              Select a local disburser to exchange your fiat currency for USDT
            </p>
          </header>

          {/* Exchange Rate Info */}
          <div className="bg-gray-800 p-4 rounded-lg mb-8 flex flex-wrap gap-4 justify-between items-center">
            <div>
              <span className="text-gray-400 text-sm">
                Current Average Rate:
              </span>
              <div className="text-xl font-bold text-yellow-400">
                1 USD = 0.98 USDT
              </div>
            </div>
            <div>
              <span className="text-gray-400 text-sm">
                Available Disbursers:
              </span>
              <div className="text-xl font-bold">{disbursers.length}</div>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Your Device ID:</span>
              <div className="text-sm font-mono bg-gray-700 p-1 rounded">
                d8f7a3b1e9c2
              </div>
            </div>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-300">
              Refresh Rates
            </Button>
          </div>

          {/* Disbursers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {disbursers.map((disburser) => (
              <Card
                key={disburser.id}
                className="bg-gray-800 border-gray-700 overflow-hidden"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-white">
                      {disburser.name}
                    </CardTitle>
                    <div className="flex items-center bg-gray-700 px-2 py-1 rounded text-sm">
                      <Star
                        className="h-4 w-4 text-yellow-400 mr-1"
                        fill="#facc15"
                      />
                      <span>{disburser.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="flex items-center text-gray-400">
                    <MapPin className="h-4 w-4 mr-1" />
                    {disburser.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">
                        Exchange Rate
                      </p>
                      <p className="font-semibold flex items-center">
                        <DollarSign className="h-4 w-4 text-yellow-400 mr-1" />
                        {disburser.exchangeRate} USDT
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Available</p>
                      <p className="font-semibold">
                        ${disburser.availableAmount}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">
                        Response Time
                      </p>
                      <p className="font-semibold flex items-center">
                        <Clock className="h-4 w-4 text-yellow-400 mr-1" />
                        {disburser.responseTime}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    asChild
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-300"
                  >
                    <Link href={`/dashboard/exchange/${disburser.id}`}>
                      Select Disburser
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
