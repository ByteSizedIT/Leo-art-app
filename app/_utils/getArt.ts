import { redirect } from "next/navigation";

import { ArtWork } from "../types";

export default async function getAllArtWork() {
  try {
    const response = await fetch("http://localhost:4000/artworks", {
      next: { revalidate: 10 },
    });
    const allArtWork: ArtWork[] = await response.json();

    // If the response status is not in the 200s range, it's an error
    if (!response.ok) {
      throw new Error("getAllArtWork failed");
    }

    return allArtWork;
  } catch (err) {
    console.log({ err });
    // log to Sentry or similar for persistance
    return [];
  }
}
