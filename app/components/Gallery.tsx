"use client";

import { ArtWork } from "@/app/types";

import SearchForm from "./SearchForm";

import { useContext } from "react";
import { SearchContext } from "../_context/search-provider";
import ArtCard from "./ArtCard";

export default function Gallery({ allArtWork }: { allArtWork: ArtWork[] }) {
  const { searchText } = useContext(SearchContext);

  return (
    <>
      <SearchForm placement={"gallery"} />

      {allArtWork?.length === 0 && <p>Oops. No art work could be found!</p>}

      <div className="w-full sm:columns-2 xl:columns-4 gap-0">
        {allArtWork
          .filter((artwork) => artwork.name.includes(searchText))
          .map((artwork) => (
            <ArtCard key={artwork.id} artWork={artwork} />
          ))}
      </div>
    </>
  );
}
