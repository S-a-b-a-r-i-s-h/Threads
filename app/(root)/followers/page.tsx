import UserCard from "@/components/cards/UserCard";
import { fetchFollowers, fetchUser } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import { auth, currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Followers",
}

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: any;
}) => {
  const colors = searchParams.c || "primary";

  //   console.log(params.id, "params id")

  const { userId: clerkId } = auth();
  //   const user = await currentUser();
  //   console.log(user.id, "user" )

  //   let mongoUser: { _id: any; };
  //   if (clerkId) {
  //     mongoUser = await fetchUser(clerkId);
  //   }

  //   console.log(mongoUser)

  const userInfo = await fetchUser(searchParams.id);
  console.log(userInfo, "user info");

  const userFollowers = userInfo.followers;
  console.log(userFollowers, "user followers");

  //   Fetch user info for each follower
  let followerUsers = [];
  for (let followerId of userFollowers) {
    console.log(followerId, "follower id");
    const followerUser = await fetchFollowers(followerId);
    // console.log(followerUser, "follower user");
    if (followerUser) {
      followerUsers.push(followerUser);
    }
  }

  console.log(followerUsers, "follower users");

  return (
    <div>
      <h1
        className={`head-text gradient-${colors} bg-clip-text text-transparent inline-block mb-16`}
      >
        Your Followers
      </h1>
      {followerUsers.map((followerUser) => (
        <UserCard
          key={followerUser.id}
          id={followerUser.id}
          name={followerUser.name}
          username={followerUser.username}
          imgUrl={followerUser.image}
          personType="User"
        />
      ))}
    </div>
  );
};

export default page;
