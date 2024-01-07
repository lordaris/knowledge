import { ModeToggle } from "./toggle";
import { AppName } from "./app-name";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between ">
        <div className="text-3xl">
          <AppName />
        </div>
        <div>middle</div>
        <div>
          <ModeToggle />{" "}
        </div>
      </div>
    </header>
  );
};
