import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Loading from "@/components/Loading";

const inter = Poppins({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay (remove this in actual implementation)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Set a timeout to simulate loading for 2 seconds (adjust as needed)

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`grid h-screen min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr] ${inter.className}`}>
      <SessionProvider session={session}>
        <Navbar />
      </SessionProvider>
      <main className="h-full overflow-y-auto bg-white px-4 lg:pl-4">
        {/* Display loading indicator when loading is true */}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loading />
          </div>
        ) : (
          // Once loading is complete, display the content
          <SessionProvider session={session}>
            <Component {...pageProps} />
            <Toaster />
          </SessionProvider>
        )}
      </main>
    </div>
  );
}
