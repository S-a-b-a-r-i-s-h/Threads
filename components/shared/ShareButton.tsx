"use client"

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'

interface ShareButtonProps {
    searchParams: string
}

const ShareButton = ({ searchParams }: ShareButtonProps) => {
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()
  const colors = searchParams

  const handleShare = async () => {
    const currentUrl = window.location.origin + "/thread/" + params.id + '?c=' + searchParams

    try {
      await navigator.clipboard.writeText(currentUrl)
      console.log('URL copied to clipboard', searchParams, params.id, currentUrl)
    } catch (err) {
      console.error('Failed to copy URL: ', err)
    }
    toast({
      title: "Link Copied!",
      className: `gradient-${colors} `,
    })
  }
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

