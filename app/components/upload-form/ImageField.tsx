"use client";

import { Dispatch } from "react";

import { ArtworkUpload, ArtWorkDispatchAction } from "../../types";

const ImageField = ({
  artWorkDispatch,
  artWorkState,
}: {
  artWorkDispatch: Dispatch<ArtWorkDispatchAction>;
  artWorkState: ArtworkUpload;
}) => {
  return (
    <label className="flex flex-col sm:flex-row items-center py-2">
      <span className="text-sm sm:text-base md:text-lg pb-2 sm:pb-0">
        Artwork:
      </span>
    </label>
  );
};
export default ImageField;
