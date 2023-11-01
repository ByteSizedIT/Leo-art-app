"use client";

import useUpload from "@/app/_hooks/useUpload";

import { ArtWorkDownload } from "../../types";

import ArtWorkNameField from "./ArtWorkNameField";
import DescriptionField from "./DescriptionField";
import StarsField from "./StarsField";
import TeamsField from "./TeamsField";
import CollectionsField from "./CollectionsField";
import TagsField from "./TagsField";
import ProductTypesField from "./ProductTypesField";
import ImageUploadField from "./ImageField";

const UploadForm = ({
  artWorkID,
  allArtWork,
  artToEdit,
}: {
  allArtWork: ArtWorkDownload[];
  artWorkID?: string;
  artToEdit?: ArtWorkDownload;
}) => {
  const {
    uploadNewArtWork,
    uploadEditedArtWork,
    artWorkState,
    artWorkDispatch,
  } = useUpload(artToEdit, artWorkID);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    artToEdit ? uploadEditedArtWork() : uploadNewArtWork();
  }

  return (
    <form
      className="w-full flex flex-col md:w-9/12 lg:w-6/12 mx-auto p-4 rounded-lg border-solid border-2 border-[#ddd] shadow-md"
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
      <StarsField
        allArtWork={allArtWork}
        artWorkState={artWorkState}
        artWorkDispatch={artWorkDispatch}
      />
      <TeamsField
        allArtWork={allArtWork}
        artWorkState={artWorkState}
        artWorkDispatch={artWorkDispatch}
      />
      <CollectionsField
        allArtWork={allArtWork}
        artWorkState={artWorkState}
        artWorkDispatch={artWorkDispatch}
      />
      <TagsField
        allArtWork={allArtWork}
        artWorkState={artWorkState}
        artWorkDispatch={artWorkDispatch}
      />
      <ProductTypesField
        allArtWork={allArtWork}
        artWorkState={artWorkState}
        artWorkDispatch={artWorkDispatch}
      />
      <ImageUploadField
        artWorkDispatch={artWorkDispatch}
        imageRequired={!artToEdit}
      />
      <button
        type="submit"
        className="w-1/2 mx-auto text-sm sm:text-base md:text-lg"
      >
        Submit {artToEdit ? "Edit" : "New Artwork"}
      </button>
    </form>
  );
};

export default UploadForm;
