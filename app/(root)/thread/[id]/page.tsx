import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";

import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";

export const revalidate = 0;

async function page({ params, searchParams }: { params: { id: string }; searchParams: any }) {
//   console.log(searchParams, params);
console.log(searchParams.c,"id")
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;



  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const { userId: clerkId } = auth();

  let mongoUser: { _id: any; };
  if (clerkId) {
    mongoUser = await fetchUser(clerkId);
  }

  // console.log(mongoUser._id, "mongo user id" )

  const thread = await fetchThreadById(params.id);
  const itemId = thread._id;
  console.log(itemId, "item id")
  console.log(JSON.stringify(itemId), "item id string")
  // console.log(thread, "thread")
  // console.log(user.id, "user id")

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
          searchParams={searchParams.c}
          upVotes={thread.upVotes.length}
          hasupVoted={thread.upVotes.includes(mongoUser._id)}
          userId={JSON.stringify(mongoUser._id)}
          itemId={JSON.stringify(itemId)}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        //   searchParams={searchParams.c}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((childItem: any) => (  
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
            searchParams={searchParams.c}
            upVotes={thread.upVotes.length}
            hasupVoted={thread.upVotes.includes(mongoUser._id)}
            userId={JSON.stringify(mongoUser._id)}
            itemId={JSON.stringify(itemId)}
          />
        ))}
      </div>
    </section>
  );
}

export default page;
