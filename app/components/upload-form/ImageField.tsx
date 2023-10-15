"use client";

import { Dispatch } from "react";

import { ArtWorkDispatchAction } from "../../types";

const ImageField = ({
  artWorkDispatch,
}: {
  artWorkDispatch: Dispatch<ArtWorkDispatchAction>;
}) => {
  return (
    <label className="flex flex-col sm:flex-row items-center py-2">
      <span className="text-sm sm:text-base md:text-lg pb-2 sm:pb-0">
        Artwork:
      </span>
      <input
        required
        type="file"
        onChange={(e) => {
          console.log(e.target.files);
          if (e.target.files && e.target.files[0])
            artWorkDispatch({ type: "image", payload: e.target.files[0] });
        }}
      />
    </label>
  );
};
export default ImageField;
