import Image from "next/image";
import Link from "next/link";



import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import ShareButton from "../shared/ShareButton";
import Votes from "../shared/Votes";

import { Button } from "../ui/button";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  searchParams: string;
  upVotes: number;
  hasupVoted: boolean;
  itemId: string;
  userId: string;
  isHome?: boolean;
  image: string;
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  searchParams,
  upVotes,
  hasupVoted,
  itemId,
  userId,
  isHome,
  image,
}: Props) {
  // console.log(image, "image");
  const colors = searchParams || "primary";
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment
          ? "px-0 xs:px-7"
          : "dark:bg-dark-2 dark:shadow-none shadow-md bg-light-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={{
                pathname: `/profile/${author?.id}`,
                query: {
                  c: searchParams,
                },
              }}
              className="relative h-11 w-11"
            >
              <Image
                src={author?.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link
              href={{
                pathname: `/profile/${author?.id}`,
                query: {
                  c: searchParams,
                },
              }}
              className="w-fit"
            >
              <h4 className="cursor-pointer text-base-semibold dark:text-light-1 mb-5">
                {author?.name}
              </h4>
            </Link>

            {/* Post image in thought */}

            {!isComment && image && (<Image
              src={image}
              alt={author.name}
              width={2000}
              height={2000}
              className="object-contain w-full rounded-xl"
            />)}

            

            <p className="mt-2 text-small-regular dark:text-light-2">
              {content}
            </p>

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                {!isComment && !isHome && (
                  <Votes
                    isComment
                    itemId={itemId}
                    userId={userId}
                    upVotes={upVotes}
                    hasupVoted={hasupVoted}
                  />
                )}
                <Link
                  href={{
                    pathname: `/thread/${id}`,
                    query: {
                      c: searchParams,
                    },
                  }}
                >
                  {isHome ? (
                    <p
                      className={`gradient-${colors} bg-clip-text text-transparent`}
                    >
                      View More
                    </p>
                  ) : (
                    <Image
                      src="/assets/reply.svg"
                      alt="heart"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                  )}
                </Link>
                {!isHome && <ShareButton searchParams={searchParams} />}
                {/* <Image
                  src='/assets/share.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                /> */}
              </div>

              {isComment && comments.length > 0 && (
                <Link
                  href={{
                    pathname: `/thread/${id}`,
                    query: {
                      c: searchParams,
                    },
                  }}
                >
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author?.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author?.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link
            href={{
              pathname: `/thread/${id}`,
              query: {
                c: searchParams,
              },
            }}
          >
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {!isComment && community && (
        <Link
          href={{
            pathname: `/communities/${community.id}`,
            query: {
              c: searchParams,
            },
          }}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;
