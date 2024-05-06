import { siteMetadataConfig } from "@/constants";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Onboarding",
    template: "%s | Thoughts",
  },
  description: "The best place to share your thoughts and ideas!",
  openGraph: {
    title: "Thoughts",
    description: "The best place to share your thoughts and ideas!",
    images: siteMetadataConfig.ogImage,
    url: "https://thoughts-a-thread.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thoughts",
    description: "The best place to share your thoughts and ideas!",
    images: siteMetadataConfig.ogImage,
  },
};

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`}>
                    <div className="w-full flex justify-center items-center min-h-screen">
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}
