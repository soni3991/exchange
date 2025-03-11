import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../../supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Clock,
  Shield,
  MessageCircle,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default async function ExchangeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for the selected disburser
  const disburser = {
    id: parseInt(params.id),
    name: "LocalCash NYC",
    location: "New York, NY",
    rating: 4.8,
    exchangeRate: 0.98,
    availableAmount: 5000,
    responseTime: "< 15 min",
    paymentMethods: ["Cash in person", "Bank transfer", "Cash deposit"],
    instructions:
      "After initiating the exchange, you'll receive a one-time QR code. Meet at the designated location or follow the payment instructions provided in the chat. Upload proof of payment to release USDT from escrow.",
  };

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-900 min-h-screen text-white overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Header with back button */}
          <div className="flex items-center mb-6">
            <Button
              asChild
              variant="ghost"
              className="mr-4 text-gray-300 hover:text-white"
            >
              <Link href="/dashboard/exchange">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Disbursers
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">
              Exchange with {disburser.name}
            </h1>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Left column - Disburser info */}
            <div className="md:col-span-1">
              <Card className="bg-gray-800 border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-white text-xl">
                    Disburser Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p>{disburser.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Rating</p>
                    <p className="flex items-center">
                      {disburser.rating} / 5.0
                      <span className="text-yellow-400 ml-1">★★★★★</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Exchange Rate</p>
                    <p className="text-yellow-400 font-bold">
                      1 USD = {disburser.exchangeRate} USDT
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Available Amount</p>
                    <p>Up to ${disburser.availableAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Response Time</p>
                    <p>{disburser.responseTime}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-xl">
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {disburser.paymentMethods.map((method, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {method}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Exchange form */}
            <div className="md:col-span-2">
              <Card className="bg-gray-800 border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-white text-xl">
                    Create Exchange
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Enter the amount you want to exchange
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">USD Amount</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-400">$</span>
                        </div>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          className="pl-8 bg-gray-700 border-gray-600 text-white"
                          defaultValue="500"
                        />
                      </div>
                      <p className="text-sm text-gray-400">
                        Min: $50 - Max: ${disburser.availableAmount}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">You pay:</span>
                        <span className="font-bold">$500.00 USD</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Exchange rate:</span>
                        <span>1 USD = {disburser.exchangeRate} USDT</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Fee:</span>
                        <span>$0.00 USD</span>
                      </div>
                      <div className="border-t border-gray-600 my-2 pt-2 flex justify-between">
                        <span className="text-gray-300">You receive:</span>
                        <span className="text-xl font-bold text-yellow-400">
                          490.00 USDT
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-700 rounded-lg flex items-start">
                      <Clock className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          Time-locked Smart Contract
                        </p>
                        <p className="text-sm text-gray-300">
                          This exchange will be secured by a smart contract with
                          a 60-minute time lock. You must complete the payment
                          within this timeframe.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-700 rounded-lg flex items-start">
                      <Shield className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Secure Escrow Protection</p>
                        <p className="text-sm text-gray-300">
                          USDT will be held in escrow until payment is
                          confirmed. If any issues arise, our dispute resolution
                          system will protect both parties.
                        </p>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex-col space-y-4">
                  <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-300 h-12 text-lg">
                    Create Exchange
                  </Button>
                  <p className="text-xs text-gray-400 text-center">
                    By creating this exchange, you agree to our Terms of Service
                    and Privacy Policy.
                  </p>
                </CardFooter>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-xl">
                    Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-300">{disburser.instructions}</p>
                    <div className="flex items-center justify-center space-x-4 pt-2">
                      <Button className="bg-gray-700 hover:bg-gray-600">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat with Disburser
                      </Button>
                      <Button className="bg-gray-700 hover:bg-gray-600">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Report Issue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
