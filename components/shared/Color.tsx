"use client"
import { useTheme } from '@/context/ThemeProvider'


const Color = () => {
  const { color, setColor } = useTheme();
  return (
    <div className='flex gap-2'>
        <button 
            className='w-[20px] h-[20px] rounded-full gradient-primary'
            onClick={() => {
                setColor('primary');
                localStorage.color = 'primary';
            }}
        >
        </button>
        <button 
            className='w-[20px] h-[20px] rounded-full gradient-secondary'
            onClick={() => {
                setColor('secondary')
                localStorage.color = 'secondary'
            }}
        >
        </button>
    </div>
  )
}

export default Color