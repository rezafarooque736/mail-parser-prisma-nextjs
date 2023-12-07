import { Inter } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import Header from "@/components/header";
import NextAuthProvider from "@/context/next-auth-providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "mailparser",
  description: "mailparser app used by RailTel SOC gurugram internal team",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <AppContextProvider>
            <Header />
            <main className="flex items-center justify-center w-full h-full overflow-auto">
              {children}
            </main>
            <ToastContainer />
          </AppContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
