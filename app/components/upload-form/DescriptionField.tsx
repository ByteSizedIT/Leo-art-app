"use client";

import { Dispatch } from "react";

import { ArtworkUpload, ArtWorkDispatchAction } from "../../types";

const Description = ({
  artWorkDispatch,
  artWorkState,
}: {
  artWorkDispatch: Dispatch<ArtWorkDispatchAction>;
  artWorkState: ArtworkUpload;
}) => {
  return (
    <label
      htmlFor="description"
      className="flex flex-col sm:flex-row items-center py-2"
    >
      <span className="text-sm sm:text-base md:text-lg pb-2 sm:pb-0">
        Description:
      </span>
      <textarea
        className="w-full text-sm sm:text-base md:text-lg bg-transparent border-solid border-2 rounded-lg  focus:outline-gray-500 ml-2 px-2 py-1 flex-1"
        rows={4}
        id="description"
        value={artWorkState.description}
        onChange={(e) =>
          artWorkDispatch({
            type: "description",
            payload: e.target.value,
          })
        }
        required
      />
    </label>
  );
};
export default Description;
