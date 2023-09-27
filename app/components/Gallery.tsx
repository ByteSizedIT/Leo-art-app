"use client";

import { ArtWork } from "@/app/types";

export default function Gallery({ allArtWork }: { allArtWork: ArtWork[] }) {
  return (
    <div className="px-10">
      {allArtWork?.length === 0 && <p>Oops. No art work could be found!</p>}

      <div className="gallery">
        {allArtWork.map((artwork) => (
          <p key={artwork.id}>{artwork.name}</p>
        ))}
      </div>
    </div>
  );
}
