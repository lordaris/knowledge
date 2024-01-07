import { ModeToggle } from "./toggle";
import { AppName } from "./app-name";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-14  items-center justify-between">
        <div className="flex-1 text-3xl">
          <AppName />
        </div>
        <div className="flex-1 text-center">middle</div>
        <div className="flex-1 text-right">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
