import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { SearchParamsProps } from "@/types";
import { siteMetadataConfig } from "@/constants";

export const meatadata: Metadata = {
  title: "Onboarding",
  description: "Complete your profile now, to use Thoughts.",
  openGraph: {
    title: "Onboaring",
    description: "Complete your profile now, to use Thoughts.",
    images: siteMetadataConfig.ogImage,
    url: "https://thoughts-a-thread.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onboarding | Thoughts",
    description: "Complete your profile now, to use Thoughts.",
    images: siteMetadataConfig.ogImage,
  },
}

async function Page({ searchParams }: SearchParamsProps) {
  const colors = searchParams.c || 'primary';
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  // if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20 bg-dark-1'>
      <h1 className={`gradient-${colors} bg-clip-text text-transparent head-text`}>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile now, to use <span className={`gradient-${colors} bg-clip-text text-transparent`}>Thoughts</span> .
      </p>

      <section className='mt-9 shadow-2xl bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='Continue' colors={colors} />
      </section>
    </main>
  );
}

export default Page;