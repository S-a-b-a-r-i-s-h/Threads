import { SearchParamsProps } from "@/types";

export default function Home({ searchParams }: SearchParamsProps) {
  const colors = searchParams.c;
  return (
    <>
      <h1 className={`head-text text-left gradient-${colors} inline bg-clip-text text-transparent`}>Home</h1>
    </>
  )
}
