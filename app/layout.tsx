import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ConnectToMongoDb from "@/utils/mongodb";
import { SiteHeader } from "@/components/ui/site-header";
import { Providers } from "@/app/providers/providers";

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
        <Providers>
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
