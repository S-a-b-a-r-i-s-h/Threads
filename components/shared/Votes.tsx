"use client";
import { fetchThreadById, upvoteThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

interface VotesParams {
    itemId: string;
    userId: string;
    upVotes: number;
    hasupVoted: boolean;
    isComment?: boolean;
}

const Votes = ({ isComment, itemId, userId, upVotes, hasupVoted }: VotesParams) => {
  const params = useParams();
  const pathname = usePathname();
//   console.log(pathname, "pathname")
  //   const result = await fetchThreadById(params.id)
  const handleVote = async () => {
    console.log(JSON.parse(itemId), JSON.parse(userId), hasupVoted, "votes")
    await upvoteThread({
        threadId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        hasupVoted,
        path: ""
    });
  };

  return (
    <div className="flex">
      <span className="dark:text-white mr-2">{upVotes}</span>
      <Image
        src={hasupVoted ? `/assets/heart-filled.svg` : "/assets/heart-gray.svg"}
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
        onClick={() => handleVote()}
      />
    </div>
  );
};

export default Votes;
