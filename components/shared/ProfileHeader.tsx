import Link from "next/link";
import Image from "next/image";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
  searchParams: string;
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
  searchParams
}: Props) {
  console.log(searchParams, "profile header")
  const colors = searchParams || 'primary';
  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className={`rounded-full p-10 relative h-20 w-20 object-cover gradient-${colors}`}>
            <Image
              src={imgUrl}
              alt='logo'
              fill
              className='rounded-full object-cover shadow-2xl'
            />
          </div>

          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold dark:text-light-1'>
              {name}
            </h2>
            <p className={`text-base-medium gradient-${colors} bg-clip-text text-transparent`}>@{username}</p>
          </div>
        </div>
        {accountId === authUserId && type !== "Community" && (
          <Link href='/profile/edit'>
            <div className={`flex cursor-pointer gap-3 rounded-lg gradient-${colors} px-4 py-2`}>
              <Image
                src='/assets/edit.svg'
                alt='logout'
                width={16}
                height={16}
              />

              <p className={`text-light-2  max-sm:hidden`}>Edit</p>
            </div>
          </Link>
        )}
      </div>

      <p className='mt-6 max-w-lg text-base-regular dark:text-light-2'>{type != "Community" && bio}</p>

      <div className={`mt-12 h-0.5 w-full gradient-${colors}`}  />
    </div>
  );
}

export default ProfileHeader;