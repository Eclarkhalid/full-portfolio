import { ChromeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function Sign() {
  return <>
  <div className="flex  items-center justify-center h-screen   w-full lg:col-span-1">
      <div className="flex flex-col items-center justify-center shadow-md rounded px-10 py-6 bg-white border border-blue-300">
        <h1 className="font-semibold text-2xl mb-6">Welcome to Your Dashboard</h1>
        <p className="mb-6 text-center">Please sign in to access the dashboard.</p>
        <Button className="flex items-center justify-center gap-2  rounded py-2 px-4"
        onClick={() => signIn('google')}
        >
          <ChromeIcon className="h-5 w-5" />
          Continue with Google
        </Button>
      </div>
    </div>
  </>
}