import { ArtWork } from "../types";
import { notFound } from "next/navigation";

// fetch from firebase
import { firestoreDB } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const revalidate = 600;

export default async function getSingleArtWork(id: string) {
  try {
    const docRef = doc(firestoreDB, "artworks", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      const ArtWork: ArtWork = { ...docSnap.data(), id: docSnap.id } as ArtWork;
      //   console.log({ ArtWork });
      return ArtWork;
    } else {
      // docSnap.data() will be undefined in this case
      throw new Error("No such document!");
    }
  } catch (err) {
    console.log({ err });
    notFound();
    // log to Sentry or similar for persistance
  }
}
