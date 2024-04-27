"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

function UserCard({ id, name, username, imgUrl, personType }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const colors = searchParams.get('c') || 'primary'

  const isCommunity = personType === "Community";

  return (
    <article className='user-card'>
      <div className='user-card_avatar'>
        <div className='relative h-12 w-12'>
          <Image
            src={imgUrl}
            alt='user_logo'
            fill
            className='rounded-full object-cover'
          />
        </div>

        <div className='flex-1 text-ellipsis'>
          <h4 className='text-base-semibold dark:text-light-1'>{name}</h4>
          <p className={`text-small-medium text-gray-1 gradient-${colors} bg-clip-text text-transparent inline-block`}>@{username}</p>
        </div>
      </div>

      <Button
        className={`user-card_btn gradient-${colors}`}
        onClick={() => {
          if (isCommunity) {
            router.push(`/communities/${id}/?c=${colors}`);
          } else {
            router.push(`/profile/${id}/?c=${colors}`);
          }
        }}
      >
        View
      </Button>
    </article>
  );
}

export default UserCard;