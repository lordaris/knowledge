import { ThemeProvider } from "@/app/providers/theme-provider";
import { CourseProvider } from "@/app/providers/course-context-provider";
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
        <CourseProvider>{children}</CourseProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
