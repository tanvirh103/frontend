import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import Navbar from "@/components/navbar";
import { cookies } from "next/headers";
import { appConfig } from "@/config/app.config";
import { Toaster } from "react-hot-toast";
import { getUserById } from "@/resource/index.service";

const roboto = Roboto({
  variable: "--font-roboto-mono",
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JOB Portal",
  description: "A Modern job portal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let userInfo: any = null;
  const cookieStore= cookies();
  const user=(await cookieStore).get(appConfig.AUTH_USER_COOKIE)?.value;
  const parsedUser = user ? JSON.parse(user) : null;
  const authCookieKey = (await cookieStore).get(appConfig.AUTH_COOKIE_KEY);
   if (parsedUser && authCookieKey) {
    try {
      userInfo = await getUserById(parsedUser.user);
    } catch (error) {
      console.log("Failed to fetch user:", error);
    }
  }
  
  return (
    <html lang="en">
      <body
        className={`${roboto.variable}`}
      >  <Navbar userInfo={userInfo} />
        {children}
        <Toaster
              position="bottom-center"
              toastOptions={{
                className: "font-normal text-xs md:text-sm normal-case items-center w-auto",
              }}
            />
      </body>
    </html>
  );
}
