import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { UserCircle, DollarSign } from "lucide-react";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-800 bg-gray-900 py-4 text-white">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="text-xl font-bold flex items-center">
          <DollarSign className="h-6 w-6 text-yellow-400 mr-2" />
          <span>AnonyExchange</span>
        </Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link href="/dashboard" className="px-4 py-2 text-sm font-medium">
                <Button
                  variant="outline"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  Exchange Dashboard
                </Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="#how-it-works"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                How It Works
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-black bg-yellow-400 rounded-md hover:bg-yellow-300"
              >
                Enter Platform
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
