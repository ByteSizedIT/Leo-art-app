"use client";

import { ArtWork } from "../../types";

import ArtWorkNameField from "./ArtWorkNameField";
import DescriptionField from "./DescriptionField";
import StarsField from "./StarsField";
import TeamsField from "./TeamsField";
import CollectionsField from "./CollectionsField";
import TagsField from "./TagsField";
import ProductTypesField from "./ProductTypesField";
import ImageUploadField from "./ImageField";

function handleSubmit() {}

const UploadForm = ({ allArtWork }: { allArtWork: ArtWork[] }) => {
  return (
    <form
      className="w-full flex flex-col md:w-6/12 mx-auto p-4 rounded-lg border-solid border-2 border-[#ddd] shadow-md"
      // w-96
      onSubmit={handleSubmit}
    >
      <ArtWorkNameField />
      <DescriptionField />
      <StarsField allArtWork={allArtWork} />
      <TeamsField allArtWork={allArtWork} />
      <CollectionsField allArtWork={allArtWork} />
      <TagsField allArtWork={allArtWork} />
      <ProductTypesField allArtWork={allArtWork} />
      <ImageUploadField />
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
