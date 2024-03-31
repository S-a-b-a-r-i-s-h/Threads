import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "The best place to share your thoughts and ideas!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicon.ico" sizes="any" />
      </head>
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

            <Bottombar />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
