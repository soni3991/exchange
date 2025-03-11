import DashboardNavbar from "@/components/dashboard-navbar";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Lock } from "lucide-react";

export default async function MessagesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for chat conversations
  const conversations = [
    {
      id: "conv1",
      disburser: "LocalCash NYC",
      lastMessage: "I'll be at the meeting point in 10 minutes.",
      time: "10:45 AM",
      unread: true,
      exchangeId: "ex123",
    },
    {
      id: "conv2",
      disburser: "FastUSDT Miami",
      lastMessage: "Payment received, releasing USDT now.",
      time: "Yesterday",
      unread: false,
      exchangeId: "ex124",
    },
    {
      id: "conv3",
      disburser: "CryptoSwap LA",
      lastMessage: "Please upload the payment receipt.",
      time: "May 15",
      unread: false,
      exchangeId: "tx789",
    },
  ];

  // Mock data for the selected conversation
  const selectedConversation = conversations[0];
  const messages = [
    {
      id: 1,
      sender: "disburser",
      text: "Hello, I've received your exchange request for $500.",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Yes, I'd like to proceed with the exchange. How should we meet?",
      time: "10:32 AM",
    },
    {
      id: 3,
      sender: "disburser",
      text: "We can meet at the coffee shop on 5th Avenue. I'll be wearing a blue jacket.",
      time: "10:35 AM",
    },
    {
      id: 4,
      sender: "user",
      text: "Sounds good. What time works for you?",
      time: "10:38 AM",
    },
    {
      id: 5,
      sender: "disburser",
      text: "How about 11:30 AM today?",
      time: "10:40 AM",
    },
    {
      id: 6,
      sender: "user",
      text: "Perfect, I'll see you there.",
      time: "10:42 AM",
    },
    {
      id: 7,
      sender: "disburser",
      text: "I'll be at the meeting point in 10 minutes.",
      time: "10:45 AM",
    },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-900 min-h-screen text-white overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h1 className="text-3xl font-bold mb-6">Encrypted Messages</h1>

          <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-200px)]">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h2 className="font-semibold">Conversations</h2>
                <div className="flex items-center text-xs text-gray-400">
                  <Lock className="h-3 w-3 mr-1" />
                  <span>End-to-End Encrypted</span>
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(100%-56px)]">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${conv.id === selectedConversation.id ? "bg-gray-700" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{conv.disburser}</h3>
                      <span className="text-xs text-gray-400">{conv.time}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-300 truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.unread && (
                        <span className="bg-yellow-400 w-2 h-2 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Exchange: {conv.exchangeId}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className="w-full md:w-2/3 bg-gray-800 rounded-lg overflow-hidden flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold">
                      {selectedConversation.disburser}
                    </h2>
                    <p className="text-xs text-gray-400">
                      Exchange ID: {selectedConversation.exchangeId}
                    </p>
                  </div>
                  <div className="flex items-center text-xs bg-gray-700 px-2 py-1 rounded">
                    <Lock className="h-3 w-3 mr-1 text-yellow-400" />
                    <span>Encrypted</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${message.sender === "user" ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"}`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${message.sender === "user" ? "text-yellow-800" : "text-gray-400"}`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-700">
                <form className="flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-700 border-gray-600 text-white"
                  />
                  <Button
                    type="submit"
                    className="bg-yellow-400 text-black hover:bg-yellow-300"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Messages are end-to-end encrypted and cannot be read by anyone
                  else
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
