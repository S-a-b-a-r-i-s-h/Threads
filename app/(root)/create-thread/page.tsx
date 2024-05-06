import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import { siteMetadataConfig } from "@/constants";

export const metadata: Metadata = {
  title: "Create",
  description: "Share your thoughts with the world!",
  openGraph: {
    title: "Create | Thoughts",
    description: "Share your thoughts with the world!",
    images: siteMetadataConfig.ogImage,
    url: "https://thoughts-a-thread.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create | Thoughts",
    description: "Share your thoughts with the world!",
    images: siteMetadataConfig.ogImage,
  },
};

async function Page({ searchParams }: SearchParamsProps) {
  const colors = searchParams.c || "primary";
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1
        className={`head-text gradient-${colors} bg-clip-text text-transparent inline-block`}
      >
        Create Thought
      </h1>
      <PostThread userId={userInfo._id} />
    </>
  );
}

export default Page;
