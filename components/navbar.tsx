"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { logOut } from "@/resource/index.service";

export default function Navbar({ userInfo }: { userInfo?: any }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    const handler = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  const handleClick = (tab: string) => {
    router.push(`/${tab}`);
    setOpen(false);
  };
  const handleLogout = async () => {
    const toastId = toast.loading("Loggin out...");
    const result = await logOut();
    if (typeof result === "string" || typeof result === "undefined") {
      toast.error(result ?? "An error occurred while processing your request", {
        id: toastId,
      });
    } else {
      toast.success(result.message, { id: toastId });
      window.location.href = "/";
    }
  };
  return (
    <nav className="w-full h-16 bg-linear-to-r from-[#fbbf24] to-[#fb7185] flex items-center px-4 lg:px-14  text-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="cursor-pointer text-white font-semibold">
          Job Portal
        </Link>
        <div className="flex justify-end">
          {userInfo ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <span>{userInfo?.name}</span>
                <ChevronDown size={18} />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-full bg-gray-200 shadow-lg rounded-md border">
                  <ul className="py-2">
                    <li
                      onClick={() => handleClick(`dashboard/${userInfo?._id}`)}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      Dashboard
                    </li>
                    <li
                      onClick={() => handleClick(`profile/${userInfo?._id}`)}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      Profile
                    </li>
                    <li onClick={()=>{handleLogout()}} className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-red-500">
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="mr-4 bg-amber-300 rounded-2xl px-4 py-2 transition-all hover:bg-amber-400"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
