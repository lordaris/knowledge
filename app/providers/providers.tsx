import { ThemeProvider } from "@/app/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

export function Providers({ children }) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}
