import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchUser } from "@/lib/actions/user.actions";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Profile",
// }

export async function generateMetadata({ params }: {params: { id: string }}): Promise<Metadata> {
  const userInfo = await fetchUser(params.id);
  return {
    title: `${userInfo.name} (@${userInfo.username})`,
    description: userInfo.bio,
    openGraph: {
      title: `${userInfo.name} (@${userInfo.username})`,
      description: userInfo.bio,
      images: [
        {
          url: userInfo.image,
          width: 1200,
          height: 630,
        }
      ]
    }
  }
}

async function Page({ params, searchParams }: { params: { id: string }; searchParams: any }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  // console.log(userInfo._id, "user info id")
  
  
  if (!userInfo?.onboarded) redirect("/onboarding");
  console.log(searchParams.c, "profile")
  const colors = searchParams.c || 'primary';
  
  const itemId = userInfo._id;

  const { userId: clerkId } = auth();

  let mongoUser: { _id: any; };
  if (clerkId) {
    mongoUser = await fetchUser(clerkId);
  }
  // console.log(mongoUser)
  // console.log(userInfo.id, user.id)

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        searchParams={searchParams.c}
        followers={userInfo.followers?.length}
        hasFollowed={userInfo.followers?.includes(mongoUser._id)}
        userId={JSON.stringify(mongoUser._id)}
        itemId={JSON.stringify(itemId)}
        paramsId={params.id}
      />

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className={`tab`}>
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className={`tab`}>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p>{tab.label}</p>

                {tab.label === "Thoughts" && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className='w-full dark:text-light-1'
            >
              {/* @ts-ignore */}
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType='User'
                searchParams={searchParams.c}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
export default Page;