import { SearchParamsProps } from '@/types'

const page = ({ searchParams }: SearchParamsProps) => {
  return (
    <div className='text-white'>
        <h1> {searchParams.c} </h1>
        <h2>hello</h2>
    </div>
  )
}

export default page