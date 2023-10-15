"use client";

import { useReducer } from "react";

import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { firestoreDB, firebaseStorage } from "@/firebase/firebase-config";

import {
  ArtWorkDownload,
  ArtworkUpload,
  ArtWorkDispatchAction,
} from "../../types";

import ArtWorkNameField from "./ArtWorkNameField";
import DescriptionField from "./DescriptionField";
import StarsField from "./StarsField";
import TeamsField from "./TeamsField";
import CollectionsField from "./CollectionsField";
import TagsField from "./TagsField";
import ProductTypesField from "./ProductTypesField";
import ImageUploadField from "./ImageField";

const initialArtWorkState: ArtworkUpload = {
  name: "",
  description: "",
  featuredStars: [],
  featuredTeams: [],
  collections: [],
  tags: [],
  productTypes: [],
  imageURL: "",
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

const UploadForm = ({ allArtWork }: { allArtWork: ArtWorkDownload[] }) => {
  const [artWorkState, artWorkDispatch] = useReducer(
    artWorkReducer,
    initialArtWorkState
  );

  async function handleSubmit() {
    // Create a reference to tobe file in storage
    const artWorkRef = ref(firebaseStorage, artWorkState.image?.name);

    // Create file to update metadata
    const newMetadata = {
      contentType: "image/jpeg",
    };

    // 'file' comes from the Blob or File API
    await uploadBytes(artWorkRef, artWorkState.image, newMetadata);

    const imageURL = await getDownloadURL(artWorkRef);

    // Add a new document with a generated id.
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
  }

  return (
    <form
      className="w-full flex flex-col md:w-6/12 mx-auto p-4 rounded-lg border-solid border-2 border-[#ddd] shadow-md"
      // w-96
      onSubmit={handleSubmit}
    >
      <ArtWorkNameField
        artWorkState={artWorkState}
        artWorkDispatch={artWorkDispatch}
      />
      <DescriptionField
        artWorkState={artWorkState}
        artWorkDispatch={artWorkDispatch}
      />
      <StarsField allArtWork={allArtWork} artWorkDispatch={artWorkDispatch} />
      <TeamsField allArtWork={allArtWork} artWorkDispatch={artWorkDispatch} />
      <CollectionsField
        allArtWork={allArtWork}
        artWorkDispatch={artWorkDispatch}
      />
      <TagsField allArtWork={allArtWork} artWorkDispatch={artWorkDispatch} />
      <ProductTypesField
        allArtWork={allArtWork}
        artWorkDispatch={artWorkDispatch}
      />
      <ImageUploadField artWorkDispatch={artWorkDispatch} />
      <button
        type="submit"
        className="w-1/2 mx-auto text-sm sm:text-base md:text-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default UploadForm;
