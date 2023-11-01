"use client";

import { useState, useReducer } from "react";

import { useRouter } from "next/navigation";

import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { firestoreDB, firebaseStorage } from "@/firebase/firebase-config";

import {
  ArtWorkDownload,
  ArtworkUpload,
  ArtWorkDispatchAction,
} from "../types";

const useUpload = (artToEdit?: ArtWorkDownload, artWorkID?: string) => {
  const initialArtWorkState: ArtworkUpload = {
    name: artToEdit?.name || "",
    description: artToEdit?.description || "",
    featuredStars: artToEdit?.featuredStars || [],
    featuredTeams: artToEdit?.featuredTeams || [],
    collections: artToEdit?.collections || [],
    tags: artToEdit?.tags || [],
    productTypes: artToEdit?.productTypes || [],
    imageURL: artToEdit?.imageURL || "",
    image: null,
  };

  function artWorkReducer(
    prevState: ArtworkUpload,
    action: ArtWorkDispatchAction
  ) {
    switch (action.type) {
      case "name":
        return { ...prevState, name: action.payload };
      case "description":
        return { ...prevState, description: action.payload };
      case "featuredStars":
        return { ...prevState, featuredStars: action.payload };
      case "featuredTeams":
        return { ...prevState, featuredTeams: action.payload };
      case "collections":
        return { ...prevState, collections: action.payload };
      case "tags":
        return { ...prevState, tags: action.payload };
      case "productTypes":
        return { ...prevState, productTypes: action.payload };
      case "image":
        return { ...prevState, image: action.payload };
      default:
        return prevState;
    }
  }

  const [artWorkState, artWorkDispatch] = useReducer(
    artWorkReducer,
    initialArtWorkState
  );

  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  async function uploadNewArtWork() {
    setError(null);
    setIsPending(true);

    try {
      // 'file' comes from the Blob or File API
      if (!artWorkState.image) throw new Error("No image file provided!");

      // Create a reference to to-be file in storage
      const artWorkRef = ref(firebaseStorage, artWorkState.image?.name);

      // Create file to update metadata
      const newMetadata = {
        contentType: "image/jpeg",
      };
      await uploadBytes(artWorkRef, artWorkState.image, newMetadata);
      const imageURL = await getDownloadURL(artWorkRef);

      // Add document to firestoreDB
      const docRef = await addDoc(collection(firestoreDB, "artworks"), {
        name: artWorkState.name,
        description: artWorkState.description,
        featuredStars: artWorkState.featuredStars,
        featuredTeams: artWorkState.featuredTeams,
        collections: artWorkState.collections,
        tags: artWorkState.tags,
        productTypes: artWorkState.productTypes,
        imageURL,
      });

      console.log("Document written with ID: ", docRef.id);
      setIsPending(false);

      router.push(
        `../upload-artwork/upload-succeeded?artWorkName=${artWorkState.name}&artWorkID=${docRef.id}`
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.log(message);
      setError(message);
      setIsPending(false);
      // send error to logging service such as Sentry

      router.push(
        `../upload-artwork/upload-failed?artWorkName=${artWorkState.name}`
      );
    }
  }

  async function uploadEditedArtWork() {
    setError(null);
    setIsPending(true);

    try {
      // 'file' comes from the Blob or File API
      if (artWorkState.image) {
        // Create a reference to the existing image file in storage
        const artWorkURL = initialArtWorkState.imageURL;
        console.log({ artWorkURL });
        const filename = artWorkURL?.split("/")?.pop()?.split("?")[0];
        console.log({ filename });

        //   const artWorkRef = ref(firebaseStorage, artWorkState.image?.name);

        const existingImageURL = `gs://leo-art-app.appspot.com/${filename}`;

        // Assuming you have a new image file to upload
        const imageFile = artWorkState.image;

        // Create a reference to the existing image
        const imageRef = ref(firebaseStorage, existingImageURL);

        // Upload the new image
        await uploadBytes(imageRef, imageFile);
        //   const imageURL = await getDownloadURL(imageRef);
      }

      // Edit document in firestoreDB
      if (!artWorkID) throw new Error("No artWorkID provided!");

      await setDoc(
        doc(firestoreDB, "artworks", artWorkID),
        {
          name: artWorkState.name,
          description: artWorkState.description,
          featuredStars: artWorkState.featuredStars,
          featuredTeams: artWorkState.featuredTeams,
          collections: artWorkState.collections,
          tags: artWorkState.tags,
          productTypes: artWorkState.productTypes,
          //   imageURL,
        },
        { merge: true }
      );

      console.log("Document written with ID: ", artWorkID);
      setIsPending(false);

      router.push(
        `../upload-artwork/upload-succeeded?artWorkName=${artWorkState.name}&artWorkID=${artWorkID}`
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.log(message);
      setError(message);
      setIsPending(false);
      // send error to logging service such as Sentry

      router.push(
        `../upload-artwork/upload-failed?artWorkName=${artWorkState.name}`
      );
    }
  }

  return {
    artWorkState,
    artWorkDispatch,
    uploadNewArtWork,
    uploadEditedArtWork,
    error,
    isPending,
  };
};

export default useUpload;
