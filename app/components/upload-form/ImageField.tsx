"use client";

import React, { useRef } from "react";

import { Dispatch } from "react";

import { ArtWorkDispatchAction } from "../../types";
import { handleClientScriptLoad } from "next/script";

const ImageField = ({
  artWorkDispatch,
}: {
  artWorkDispatch: Dispatch<ArtWorkDispatchAction>;
}) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 1024 * 1024 * 2; // 2MB
      if (file && file.size > maxSize) {
        alert("File size exceeds the limit (2MB)");
        fileUploadRef.current!.value = ""; // reset the input field
      } else artWorkDispatch({ type: "image", payload: e.target.files[0] });
    }
  }

  return (
    <label className="flex flex-col sm:flex-row items-center py-2">
      <span className="text-sm sm:text-base md:text-lg pb-2 sm:pb-0">
        Artwork:
      </span>
      <input
        required
        type="file"
        ref={fileUploadRef}
        accept=".png"
        className="w-full text-sm sm:text-base md:text-lg bg-transparent border-solid border-2 rounded-lg  focus:outline-gray-500 ml-2 px-2 py-1 flex-1"
        onChange={handleChange}
      />
    </label>
  );
};
export default ImageField;
