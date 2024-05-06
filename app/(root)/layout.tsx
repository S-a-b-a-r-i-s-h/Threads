import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { siteMetadataConfig } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Thoughts",
    template: "%s | Thoughts",
  },
  description: "The best place to share your thoughts and ideas!",
  openGraph: {
    title: "Thoughts",
    description: "The best place to share your thoughts and ideas!",
    images: siteMetadataConfig.ogImage,
    url: "https://thoughts-a-thread.vercel.app"
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Thoughts",
    description:
      "The best place to share your thoughts and ideas!",
    images: siteMetadataConfig.ogImage,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ThemeProvider>
            <Topbar />

            <main className="flex flex-row">
              <LeftSidebar />
              <section className="main-container">
                <div className="w-full max-w-4xl">{children}</div>
              </section>

              <RightSidebar />
            </main>
            <Toaster />

            <Bottombar />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
