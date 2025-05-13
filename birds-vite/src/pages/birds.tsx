import { useQuery } from "@apollo/client";
import { GET_BIRDS, Bird} from "../lib/queries-and-mutations/birds";
import { BirdCard } from "../components/birds-list-item-card";
import { Breadcrumbs } from "../components/breadcrumbs";
import { useState } from "react";
import { Loader } from "../components/loader";

export const BirdsPage = () => {
  const { data, loading, error } = useQuery<{birds: Bird[]}>(GET_BIRDS);
  const [search, setSearch] = useState("");
  const filteredBirds = data?.birds.filter((bird: Bird) => bird.english_name.toLowerCase().includes(search.toLowerCase()));
  console.log(data);
  return (
    <div>
      <Breadcrumbs crumbs={["Birds"]} />
      <div className="flex w-full py-6 ">
        <div className="flex items-center justify-center  p-2 w-full bg-slate-500/8 rounded-md focus-within:bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for birds"
          className=" w-full p-2 border-none border-gray-200 rounded-md focus:outline-none focus:ring-0"
        />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4  border-t border-gray-200 pt-4">
        {error && <div>Error: {error.message}</div>}
        {loading ? (
          <Loader />
        ) : (
          filteredBirds &&
          filteredBirds.map((bird: Bird) => <BirdCard key={bird.id} bird={bird} />)
        )}
      </div>
    </div>
  );
};
