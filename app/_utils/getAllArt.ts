import { cache } from "react";

import { ArtWork } from "../types";

// fetch using json-server to retrieve all artworks from local db.json
// export default async function getAllArtWork() {
//   try {
//     const response = await fetch("http://localhost:4000/artworks", {
//       next: { revalidate: 10 },
//     });
//     const allArtWork: ArtWork[] = await response.json();

//     // If the response status is not in the 200s range, it's an error
//     if (!response.ok) {
//       throw new Error("getAllArtWork failed");
//     }

//     return allArtWork;
//   } catch (err) {
//     console.log({ err });
//     // log to Sentry or similar for persistance
//     return [];
//   }
// }

// fetch from firebase
import { firestoreDB } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const revalidate = 300;

// export default function getAllArtWork() {
//   // ...
//   return cache(async () => {})}
export const getAllArtWork = cache(async () => {
  try {
    const allArtWork: ArtWork[] = [];
    const querySnapshot = await getDocs(collection(firestoreDB, "artworks"));
    querySnapshot.forEach((doc) => {
      allArtWork.push({ ...doc.data(), id: doc.id } as ArtWork);
    });
    return allArtWork;
  } catch (err) {
    console.log({ err });
    // log to Sentry or similar for persistance
    return [];
  }
});
