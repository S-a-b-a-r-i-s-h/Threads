"use client";

import { formUrlQuery } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "../ui/input";

interface Props {
  routeType: string;
}

function Searchbar({ routeType }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const colors = searchParams.get('c') || 'primary'
  const [search, setSearch] = useState("");

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        // router.push(`/${routeType}?q=` + search);
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'q',
            value: search.toLowerCase()
        })
        router.push(newUrl, { scroll: false });
      } else {
        router.push(`/${routeType}?c=${colors}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  return (
    <div className='searchbar'>
      <Image
        src='/assets/search-gray.svg'
        alt='search'
        width={24}
        height={24}
        className='object-contain'
      />
      <Input
        id='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
          routeType !== "search" ? "Search Communities" : "Search Creators"
        }`}
        className='no-focus searchbar_input'
      />
    </div>
  );
}

export default Searchbar;