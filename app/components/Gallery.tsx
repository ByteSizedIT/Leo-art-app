"use client";

import { ArtWork } from "@/app/types";

import SearchForm from "./SearchForm";

import { useContext } from "react";
import { SearchContext } from "../_context/search-provider";

export default function Gallery({ allArtWork }: { allArtWork: ArtWork[] }) {
  const { searchText } = useContext(SearchContext);

  return (
    <div className="px-10">
      <SearchForm placement={"gallery"} />

      {allArtWork?.length === 0 && <p>Oops. No art work could be found!</p>}

      <div className="gallery">
        {allArtWork
          .filter((artwork) => artwork.name.includes(searchText))
          .map((artwork) => (
            <p key={artwork.id}>{artwork.name}</p>
          ))}
      </div>
    </div>
  );
}
