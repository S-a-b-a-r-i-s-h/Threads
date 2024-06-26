import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import Pagination from "@/components/shared/Pagination";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import { siteMetadataConfig } from "@/constants";

export const metadata: Metadata = {
  title: "Search",
  openGraph: {
    title: "Search",
    description: "Search for the user account you are looking for!",
    images: siteMetadataConfig.ogImage,
    url: "https://thoughts-a-thread.vercel.app"
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Search | Thoughts",
    description:
      "Search for the user account you are looking for!",
    images: siteMetadataConfig.ogImage,
  },
}

async function Page({ searchParams }: SearchParamsProps) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const colors = searchParams.c || 'primary';

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className={`head-text mb-10 gradient-${colors} bg-clip-text text-transparent inline-block`}>Search</h1>

      <Searchbar 
        routeType='search'
      />

      <div className='mt-14 flex flex-col gap-9'>
        {result.users.length === 0 ? (
          <p className='no-result'>No Result</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>

      <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}

export default Page;