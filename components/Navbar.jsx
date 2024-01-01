import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { CodeIcon, HomeIcon, LayoutDashboard, LineChartIcon, LogOut, Package2Icon, PackageIcon, UsersIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { pathname } = router;

  const active = 'flex items-center gap-3 rounded-lg bg-gray-300 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50';
  const inActive = 'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400';

  if (session) {
    return (
      <div className="h-screen min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr] hidden md:grid">
        <div className="hidden border-r md:block">
          <div className="flex flex-col gap-2 h-full">
            <div className="flex h-[60px] items-center px-6">
              <Link className="flex items-center gap-2 font-semibold" href="#">
                <Package2Icon className="h-6 w-6" />
                <span className="">{session.user.name}</span>
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="grid items-start px-4 text-md font-medium">
                <Link className={pathname === '/' ? active : inActive} href="/">
                  <HomeIcon className="h-4 w-4" />
                  Home
                </Link>
                <Link className={pathname === '/projects' ? active : inActive} href="/projects">
                  <CodeIcon className="h-4 w-4" />
                  Projects
                </Link>
                <Link className={pathname === '/add' ? active : inActive} href="#">
                  <PackageIcon className="h-4 w-4" />
                  Experience
                </Link>
                <Link className={pathname === '/add' ? active : inActive} href="#">
                  <UsersIcon className="h-4 w-4" />
                  Testimonials
                </Link>
                <Link className={pathname === '/add' ? active : inActive} href="#">
                  <LineChartIcon className="h-4 w-4" />
                  Articles
                </Link>
              </nav>
            </div>
            {/* Placing the "get" text at the bottom */}
            <div className="flex items-end justify-start px-4 pb-20">
              <button onClick={() => signOut()} className={pathname === '/add' ? active : inActive} href="#">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Return null or alternative content for non-signed-in users
  return <>
  <div className="bg-slate-900 text-white flex justify-center items-center gap-1 text-2xl font-bold">
    <LayoutDashboard className=' animate-spin' />
    Dashboard
  </div>
  </>
}
