"use client"
import { formUrlQuery } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const Color = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState('primary');
  
  const handleColorFilter = (item: string) => {
    if(active !== item) {
        setActive(item);
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'c',
            value: item.toLowerCase()
        })
        router.push(newUrl, { scroll: false });
    }
  }
  return (
    <div className='flex gap-2'>
        <button 
            className='w-[20px] h-[20px] rounded-full gradient-primary'
            onClick={() => {
                localStorage.color = 'primary';
                handleColorFilter('primary');
            }}
        >
        </button>
        <button 
            className='w-[20px] h-[20px] rounded-full gradient-secondary'
            onClick={() => {
                localStorage.color = 'secondary'
                handleColorFilter('secondary');
            }}
        >
        </button>
        <button 
            className='w-[20px] h-[20px] rounded-full gradient-tertiary'
            onClick={() => {
                localStorage.color = 'tertiary'
                handleColorFilter('tertiary');
            }}
        >
        </button>
        {/* <button 
            className='w-[20px] h-[20px] rounded-full gradient-four'
            onClick={() => {
                localStorage.color = 'four'
                handleColorFilter('four');
            }}
        >
        </button> */}
    </div>
  )
}

export default Color