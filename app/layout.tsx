import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ConnectToMongoDb from "@/utils/mongodb";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/ui/site-header";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Knowledge, by Aris",
  description: "Learn with text-based courses",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // MongoDB connection
  await ConnectToMongoDb();
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
