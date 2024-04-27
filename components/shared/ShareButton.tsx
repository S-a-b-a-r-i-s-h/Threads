"use client"

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

interface ShareButtonProps {
    searchParams: string
}

const ShareButton = ({ searchParams }: ShareButtonProps) => {
  const router = useRouter()
  const params = useParams()

  const handleShare = async () => {
    const currentUrl = window.location.origin + "/thread/" + params.id + '?c=' + searchParams

    try {
      await navigator.clipboard.writeText(currentUrl)
      console.log('URL copied to clipboard', searchParams, params.id, currentUrl)
    } catch (err) {
      console.error('Failed to copy URL: ', err)
    }
  }
  http://localhost:3001661a7a855074a545dc18e283?c=primary
  return (
    <div>
        <Image 
            src='/assets/repost.svg'
            alt='share'
            width={24}
            height={24}
            className='cursor-pointer object-contain'
            onClick={handleShare}
        />
    </div>
  )
}

export default ShareButton

