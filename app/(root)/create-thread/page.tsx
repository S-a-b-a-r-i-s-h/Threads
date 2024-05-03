import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create",
}

async function Page({ searchParams }: SearchParamsProps) {
  const colors = searchParams.c || 'primary';
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className={`head-text gradient-${colors} bg-clip-text text-transparent inline-block`}>Create Thought</h1>

      <PostThread userId={userInfo._id} />
    </>
  );
}

export default Page;