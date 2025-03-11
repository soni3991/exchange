import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Download,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function HistoryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for transaction history
  const transactions = [
    {
      id: "tx789",
      disburser: "CryptoSwap LA",
      amount: "$800",
      usdtAmount: "784.00",
      date: "2023-05-15 14:30",
      status: "Completed",
      paymentMethod: "Cash in person",
      exchangeRate: "0.98",
    },
    {
      id: "tx790",
      disburser: "SecureTrade Chicago",
      amount: "$350",
      usdtAmount: "336.00",
      date: "2023-05-10 09:15",
      status: "Completed",
      paymentMethod: "Bank transfer",
      exchangeRate: "0.96",
    },
    {
      id: "tx791",
      disburser: "LocalCash NYC",
      amount: "$1,000",
      usdtAmount: "0.00",
      date: "2023-05-05 16:45",
      status: "Cancelled",
      paymentMethod: "Cash deposit",
      exchangeRate: "0.98",
    },
    {
      id: "tx792",
      disburser: "FastUSDT Miami",
      amount: "$500",
      usdtAmount: "485.00",
      date: "2023-04-28 11:20",
      status: "Completed",
      paymentMethod: "Cash in person",
      exchangeRate: "0.97",
    },
    {
      id: "tx793",
      disburser: "CryptoSwap LA",
      amount: "$1,200",
      usdtAmount: "1,176.00",
      date: "2023-04-15 13:10",
      status: "Completed",
      paymentMethod: "Bank transfer",
      exchangeRate: "0.98",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-900 min-h-screen text-white overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h1 className="text-3xl font-bold mb-6">Transaction History</h1>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                className="pl-10 bg-gray-800 border-gray-700 text-white w-full"
              />
            </div>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">
                  Total Exchanges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{transactions.length}</div>
                <p className="text-sm text-gray-400">All-time transactions</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">
                  Total Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$3,850</div>
                <p className="text-sm text-gray-400">USD exchanged</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">
                  Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">80%</div>
                <p className="text-sm text-gray-400">4 of 5 completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Transactions Table */}
          <Card className="bg-gray-800 border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 text-gray-400 font-medium">
                      ID
                    </th>
                    <th className="text-left p-4 text-gray-400 font-medium">
                      Date
                    </th>
                    <th className="text-left p-4 text-gray-400 font-medium">
                      Disburser
                    </th>
                    <th className="text-left p-4 text-gray-400 font-medium">
                      Amount (USD)
                    </th>
                    <th className="text-left p-4 text-gray-400 font-medium">
                      Amount (USDT)
                    </th>
                    <th className="text-left p-4 text-gray-400 font-medium">
                      Rate
                    </th>
                    <th className="text-left p-4 text-gray-400 font-medium">
                      Method
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
                  {transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="p-4 font-mono text-sm">{tx.id}</td>
                      <td className="p-4 text-gray-300">{tx.date}</td>
                      <td className="p-4">{tx.disburser}</td>
                      <td className="p-4 font-medium">{tx.amount}</td>
                      <td className="p-4 font-medium text-yellow-400">
                        {tx.usdtAmount}
                      </td>
                      <td className="p-4">{tx.exchangeRate}</td>
                      <td className="p-4">{tx.paymentMethod}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          {tx.status === "Completed" ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-green-400">Completed</span>
                            </>
                          ) : tx.status === "Cancelled" ? (
                            <>
                              <XCircle className="h-4 w-4 text-red-500 mr-1" />
                              <span className="text-red-400">Cancelled</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-yellow-400">Pending</span>
                            </>
                          )}
                        </div>
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

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-lg">
            <p className="text-sm text-gray-400 text-center">
              Your transaction history is stored locally and encrypted. No
              personal data is shared with third parties.
              <br />
              Device ID: <span className="font-mono">d8f7a3b1e9c2</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
