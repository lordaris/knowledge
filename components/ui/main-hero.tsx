import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AppName } from "./app-name";

export const MainHero = () => {
  return (
    <section className="flex h-screen items-center justify-center">
      <div className=" text-center">
        <h1 className="text-5xl text-foreground">
          Welcome to
          <AppName />
        </h1>{" "}
        <p className="flex justify-end text-xl text-muted-foreground">
          by Aris
        </p>
        <Button asChild className="mx-4">
          <Link href="/courses">Explore our courses</Link>
        </Button>
        <Button asChild>
          <Link href="/about">About</Link>
        </Button>
      </div>
    </section>
  );
};
