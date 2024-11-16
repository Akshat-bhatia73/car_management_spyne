import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="border-b py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Car Management
        </Link>
        
        <div className="flex items-center gap-4">
          <SignedIn>
            <Link 
              href="/cars/create" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Car
            </Link>
            <UserButton afterSignOutUrl="/"/>
          </SignedIn>
          
          <SignedOut>
            <Link 
              href="/sign-in"
              className="text-blue-600 hover:text-blue-700"
            >
              Sign In
            </Link>
            <Link 
              href="/sign-up"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
} 