import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts, fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home({ params, searchParams }: { params: { id: string }; searchParams: SearchParamsProps }) {
  const colors = searchParams.c || 'primary';
  console.log(searchParams.c);

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const { userId: clerkId } = auth();

  let mongoUser: { _id: any; };
  if (clerkId) {
    mongoUser = await fetchUser(clerkId);
  }

  // const thread = await fetchThreadById(params.id);
  // const itemId = thread._id;

  const result = await fetchPosts(1, 30);
  // console.log(result);
  return (
    <>
      <h1 className={`head-text text-left gradient-${colors} inline bg-clip-text text-transparent`}>Home</h1>

      <section className='mt-9 flex flex-col gap-10'>
        {result.posts.length === 0 ? (
          <p className='no-result'>No thoughts found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                searchParams={colors}
                isHome
                // upVotes={thread.upVotes.length}
                // hasupVoted={thread.upVotes.includes(mongoUser._id)}
                // userId={JSON.stringify(mongoUser._id)}
                // itemId={JSON.stringify(itemId)}
              />
            ))}
          </>
        )}
      </section>
    </>
  )
}
