import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Thoughts",
    template: "%s | Thoughts",
  },
  twitter: {
    card: "summary_large_image",
  },
  description: "The best place to share your thoughts and ideas!",
  other: {
    "og:title": "Thoughts",
    "og:description": "The best place to share your thoughts and ideas!",
    "og:url": "thoughts-a-thread.vercel.app",
    "og:image": "https://i.postimg.cc/DzvqrW8k/opengraph-image.png",
    "twitter:title": "Thoughts",
    "twitter:description": "The best place to share your thoughts and ideas!",
    "twitter:image": "https://i.postimg.cc/DzvqrW8k/opengraph-image.png",
    "twitter:card": "summary_large_image",
  }
  // openGraph: {
  //   title: "Thoughts",
  //   description: "The best place to share your thoughts and ideas!",
  //   images: [
  //     {
  //       url: "https://threads-3y6k3bjyf-sabarishs-projects-ff1ef71e.vercel.app/opengraph-image.png?54361e507490551f"
  //     }
  //   ],
  //   url: "https://thoughts-a-thread.vercel.app/"
  // },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
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
            <Toaster />

            <Bottombar />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}