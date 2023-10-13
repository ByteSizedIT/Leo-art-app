"use client";

import { Dispatch } from "react";

import { ArtworkUpload, ArtWorkDispatchAction } from "../../types";

const ArtWorkName = ({
  artWorkDispatch,
  artWorkState,
}: {
  artWorkDispatch: Dispatch<ArtWorkDispatchAction>;
  artWorkState: ArtworkUpload;
}) => {
  return (
    <label
      htmlFor="name"
      className="flex flex-col sm:flex-row items-center py-2"
    >
      <span className="text-sm sm:text-base md:text-lg pb-2 sm:pb-0">
        ArtWork Name:
      </span>
      <input
        className="w-full text-sm sm:text-base md:text-lg bg-transparent border-solid border-2 rounded-lg focus:outline-gray-500 ml-2 px-2 py-1 flex-1"
        id="name"
        type="text"
        value={artWorkState.name}
        onChange={(e) =>
          artWorkDispatch({ type: "name", payload: e.target.value })
        }
        required
      />
    </label>
  );
};
export default ArtWorkName;
