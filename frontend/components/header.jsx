"use client";

import { headernavLink } from "@/data";
import Link from "next/link";
import LogoIcons from "./icons/logo-icons";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import SignOutButton from "./auth-components/sign-out-button";
import { Button } from "./ui/button";
import { useEffect } from "react";

export default function Header() {
  const { data: session, status: sessionStatus } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/auth/sign-in" && sessionStatus === "unauthenticated") {
      router.replace("/auth/sign-in?callbackUrl=/");
    }
  }, [sessionStatus, router]);

  return (
    <header
      className={cn(
        "bg-zinc-100 text-slate-800 border-b border-s-zinc-200 w-full z-10 top-0",
        {
          hidden: ["/auth/sign-in"].includes(pathname),
        }
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/">
          <LogoIcons />
        </Link>
        <nav className="flex items-center gap-10 uppercase">
          {headernavLink.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="px-3 py-1 border hover:rounded-lg hover:bg-white hover:border-slate-400"
            >
              {item.name}
            </Link>
          ))}
          {session ? (
            <div className="flex flex-col items-center gap-1 text-[.6rem] font-medium">
              <SignOutButton />
            </div>
          ) : (
            <Button asChild>
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
