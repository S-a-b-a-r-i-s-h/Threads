"use client"

import { useTheme } from '@/context/ThemeProvider'
import Image from 'next/image';
const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <>
      <Image 
        src={mode === 'light' ? '/assets/sun.svg' : '/assets/moon.svg'}
        alt={mode === 'light' ? 'light mode' : 'dark mode'}
        width={20}
        height={20}
        className="cursor-pointer"
        onClick={() => {
            setMode(mode === 'light' ? 'dark' : 'light')
            localStorage.theme = mode === 'light' ? 'dark' : 'light'
            console.log(localStorage.theme)
        }}
      />
    </>
  )
}

export default Theme