import { ModeToggle } from "./toggle";
import { AppName } from "./app-name";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-14  items-center justify-between">
        <div className="text-3xl">
          <Link href="/">
            <AppName />
          </Link>
        </div>
        <div>
          <ModeToggle />
        </div>
        <div className="flex items-center  space-x-4">
          <SignedIn>
            <Button asChild>
              <Link href="/instructor">Dashboard </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button asChild className="">
              <Link href="/dashboard">Login </Link>
            </Button>
          </SignedOut>

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};
