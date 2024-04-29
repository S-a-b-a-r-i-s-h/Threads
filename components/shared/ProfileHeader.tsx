"use client";
import Link from "next/link";
import Image from "next/image";
import { followUser } from "@/lib/actions/user.actions";
import Color from "./Color";
import { Button } from "../ui/button";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
  searchParams: string;
  followers: number;
  hasFollowed: boolean;
  userId: string;
  itemId: string;
  paramsId?: string;
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
  searchParams,
  followers,
  hasFollowed,
  userId,
  itemId,
  paramsId,
}: Props) {
  const handleFollow = async () => {
    console.log(JSON.parse(itemId), JSON.parse(userId), hasFollowed, "follows");
    await followUser({
      itemId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      hasFollowed,
      path: "",
    });
  };
  // console.log(searchParams, "profile header")
  const colors = searchParams || "primary";
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-full p-10 relative h-20 w-20 object-cover gradient-${colors}`}
          >
            <Image
              src={imgUrl}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold dark:text-light-1">
              {name}
            </h2>
            <p
              className={`text-base-medium gradient-${colors} bg-clip-text text-transparent`}
            >
              @{username}
            </p>
          </div>
        </div>
        {accountId === authUserId && type !== "Community" && (
          <Link href="/profile/edit">
            <div
              className={`flex cursor-pointer gap-3 rounded-lg gradient-${colors} px-4 py-2`}
            >
              <Image
                src="/assets/edit.svg"
                alt="logout"
                width={16}
                height={16}
              />

              <p className={`text-light-2  max-sm:hidden`}>Edit</p>
            </div>
          </Link>
        )}
      </div>

      <div className="flex gap-7 items-center mt-4">
        {accountId !== authUserId && (
          <div>
            <Button
              className={`gradient-${colors} text-white dark:text-white w-24`}
              onClick={() => {
                handleFollow();
              }}
            >
              {hasFollowed ? "Unfollow" : "Follow"}
            </Button>  
          </div>
        )}
        {followers == 0 ? (
          <p className={`gradient-${colors} text-transparent bg-clip-text`}>No Followers</p>
        ): (
          <Link 
          href={{
            pathname: `/followers`,
            query: { c: colors, id: paramsId } 
          }} 
          className={`gradient-${colors} text-transparent bg-clip-text`}
        >
          {followers == 1 ? `${followers} follower` : `${followers} followers`}
        </Link>
        )}
        
      </div>
      
      <div className="mt-4 dark:text-white mb-2">
        {accountId === authUserId && type !== "Community" && (
          <>
            <div className="hidden max-sm:block">
              <h1
                className={`gradient-${colors} bg-clip-text text-transparent inline-block mb-4`}
              >
                Change Theme
              </h1>
              <Color />
            </div>
          </>
        )}
      </div>
      <span
        className={`gradient-${colors} bg-clip-text text-transparent mt-3 w-[30px]`}
      >
        {type !== "Community" ? "Bio" : ""}
      </span>
      <p className="mt-2 max-w-lg text-base-regular dark:text-light-2">
        {type != "Community" && bio}
      </p>

      <div className={`mt-12 h-0.5 w-full gradient-${colors}`} />
    </div>
  );
}

export default ProfileHeader;
