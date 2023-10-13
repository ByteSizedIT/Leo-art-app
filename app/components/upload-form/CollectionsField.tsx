"use client";

import React, { useEffect, useState, useRef } from "react";

import { Dispatch } from "react";

import { ArtWorkDispatchAction } from "../../types";

import CreatableSelect from "react-select/creatable";

import { ArtWork, ReactSelectOption as Option } from "../../types";

import { customStyles } from "@/app/_utils/react-select-styles";

import sort from "@/app/_utils/sortReactSelectOptions";

const CollectionsField = ({
  allArtWork,
  artWorkDispatch,
}: {
  allArtWork: ArtWork[];
  artWorkDispatch: Dispatch<ArtWorkDispatchAction>;
}) => {
  const [existingCollections, setExistingCollections] = useState<Option[]>([]);

  // set existing collections
  useEffect(() => {
    const tempCollectionsArr: Option[] = [];
    allArtWork.forEach((artWork) => {
      if (artWork.collections && artWork.collections.length > 0) {
        artWork.collections.forEach((featuredCollection) => {
          if (
            !tempCollectionsArr.some(
              (tempCollection) => tempCollection.value === featuredCollection
            )
          )
            tempCollectionsArr.push({
              value: featuredCollection,
              label: featuredCollection,
            });
        });
      }
    });

    sort(tempCollectionsArr);

    setExistingCollections([...tempCollectionsArr]);
  }, [allArtWork]);

  function handleChange(selectedOptions: Option[]) {
    console.log(selectedOptions);
    const collections = selectedOptions.map((collection) => collection.value);
    artWorkDispatch({ type: "collections", payload: collections });
  }

  return (
    <label className="flex flex-col sm:flex-row items-center py-2">
      <span className="text-sm sm:text-base md:text-lg pb-2 sm:pb-0">
        Collections:
      </span>
      <CreatableSelect
        id="collections"
        styles={customStyles}
        isMulti
        options={existingCollections}
        onChange={handleChange}
      />
    </label>
  );
};
export default CollectionsField;
