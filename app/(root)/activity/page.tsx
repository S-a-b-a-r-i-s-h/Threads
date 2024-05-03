import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activity",
}

async function Page({ searchParams }: SearchParamsProps) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);
  const colors = searchParams.c || 'primary';

  return (
    <>
      <h1 className={`head-text gradient-${colors} bg-clip-text text-transparent inline-block`}>Activity</h1>

      <section className='mt-10 flex flex-col gap-5'>
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link 
                key={activity._id} 
                href={{
                    pathname: `/thread/${activity.parentId}`,
                    query: { c: colors },
                }}
              >
                <article className='activity-card'>
                  <Image
                    src={activity.author.image}
                    alt='user_logo'
                    width={20}
                    height={20}
                    className='rounded-full object-cover'
                  />
                  <p className='!text-small-regular dark:text-light-1'>
                    <span className={`mr-1 gradient-${colors} bg-clip-text text-transparent`}>
                      {activity.author.name}
                    </span>{" "}
                    replied to your thought
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className='!text-base-regular text-light-3'>No activity yet</p>
        )}
      </section>
    </>
  );
}

export default Page;