import { ThemeProvider } from "@/app/providers/theme-provider";
import { CourseProvider } from "@/app/providers/course-context-provider";

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <CourseProvider>{children}</CourseProvider>
    </ThemeProvider>
  );
}
