import { ModeToggle } from "./toggle";
import { AppName } from "./app-name";
import { UserButton } from "@clerk/nextjs";
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
        <div className=" text-center">
          <ModeToggle />
        </div>
        <div className="flex">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};
