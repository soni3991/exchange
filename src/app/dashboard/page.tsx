import DashboardNavbar from "@/components/dashboard-navbar";
import {
  InfoIcon,
  ArrowRight,
  DollarSign,
  RefreshCcw,
  Clock,
  Shield,
  MessageCircle,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for active exchanges and recent transactions
  const activeExchanges = [
    {
      id: "ex123",
      disburser: "LocalCash NYC",
      amount: "$500",
      status: "Waiting for payment",
      timeLeft: "45 minutes",
    },
    {
      id: "ex124",
      disburser: "FastUSDT Miami",
      amount: "$1,200",
      status: "Payment verification",
      timeLeft: "30 minutes",
    },
  ];

  const recentTransactions = [
    {
      id: "tx789",
      disburser: "CryptoSwap LA",
      amount: "$800",
      date: "2023-05-15",
      status: "Completed",
    },
    {
      id: "tx790",
      disburser: "SecureTrade Chicago",
      amount: "$350",
      date: "2023-05-10",
      status: "Completed",
    },
    {
      id: "tx791",
      disburser: "LocalCash NYC",
      amount: "$1,000",
      date: "2023-05-05",
      status: "Cancelled",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-900 min-h-screen text-white">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Anonymous Exchange Dashboard</h1>
            <div className="bg-gray-800 text-sm p-4 rounded-lg text-gray-300 flex gap-2 items-center">
              <InfoIcon size="16" className="text-yellow-400" />
              <span>
                Welcome to the anonymous exchange platform. No registration or
                personal data required.
              </span>
            </div>
          </header>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">
                  Current Exchange Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-yellow-400 mr-2" />
                  <div>
                    <p className="text-2xl font-bold">1 USD = 0.98 USDT</p>
                    <p className="text-xs text-gray-400">
                      Updated 5 minutes ago
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">
                  Available Disbursers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <RefreshCcw className="h-8 w-8 text-yellow-400 mr-2" />
                  <div>
                    <p className="text-2xl font-bold">24 Active</p>
                    <p className="text-xs text-gray-400">Across 12 locations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">
                  Your Device ID
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-yellow-400 mr-2" />
                  <div>
                    <p className="text-lg font-mono font-bold">d8f7a3b1e9c2</p>
                    <p className="text-xs text-gray-400">
                      Used for anonymous authentication
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Exchanges */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Active Exchanges</h2>
              <Button
                asChild
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                <Link href="/dashboard/exchange">
                  New Exchange
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {activeExchanges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeExchanges.map((exchange) => (
                  <Card
                    key={exchange.id}
                    className="bg-gray-800 border-gray-700"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-white">
                          {exchange.disburser}
                        </CardTitle>
                        <div className="px-2 py-1 bg-yellow-400 text-black text-xs rounded-full">
                          {exchange.status}
                        </div>
                      </div>
                      <CardDescription className="text-gray-400">
                        Exchange ID: {exchange.id}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-400 text-xs">Amount</p>
                          <p className="text-xl font-bold">{exchange.amount}</p>
                        </div>
                        <div className="flex items-center text-yellow-400">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            {exchange.timeLeft} left
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button className="flex-1 bg-gray-700 hover:bg-gray-600">
                        View Details
                      </Button>
                      <Button className="flex-1 bg-yellow-400 text-black hover:bg-yellow-300">
                        <MessageCircle className="h-4 w-4 mr-1" /> Chat
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-gray-800 border-gray-700 p-6 text-center">
                <p className="text-gray-400 mb-4">
                  You don't have any active exchanges
                </p>
                <Button
                  asChild
                  className="bg-yellow-400 text-black hover:bg-yellow-300 mx-auto"
                >
                  <Link href="/dashboard/exchange">
                    Start New Exchange
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            )}
          </section>

          {/* Recent Transactions */}
          <section>
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 text-gray-400 font-medium">
                        ID
                      </th>
                      <th className="text-left p-4 text-gray-400 font-medium">
                        Disburser
                      </th>
                      <th className="text-left p-4 text-gray-400 font-medium">
                        Amount
                      </th>
                      <th className="text-left p-4 text-gray-400 font-medium">
                        Date
                      </th>
                      <th className="text-left p-4 text-gray-400 font-medium">
                        Status
                      </th>
                      <th className="text-left p-4 text-gray-400 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="border-b border-gray-700 hover:bg-gray-700/50"
                      >
                        <td className="p-4 font-mono text-sm">{tx.id}</td>
                        <td className="p-4">{tx.disburser}</td>
                        <td className="p-4 font-medium">{tx.amount}</td>
                        <td className="p-4 text-gray-400">{tx.date}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${tx.status === "Completed" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}
                          >
                            {tx.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}
