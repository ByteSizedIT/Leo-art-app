"use client";

import React, { useEffect, useState, useRef } from "react";

import { Dispatch } from "react";

import {
  ArtWork,
  ArtWorkDispatchAction,
  ArtWorkDownload,
  ArtworkUpload,
  ReactSelectOption,
} from "../../types";

import CreatableSelect from "react-select/creatable";

import { MultiValue, ActionMeta } from "react-select";

// import Select from "react-select/dist/declarations/src/Select";

// import { GroupBase } from "react-select";

import { customStyles } from "@/app/_utils/react-select-styles";

import sort from "@/app/_utils/sortReactSelectOptions";

const StarsField = ({
  allArtWork,
  artWorkState,
  artWorkDispatch,
}: {
  allArtWork: ArtWork[];
  artWorkState?: ArtworkUpload;
  artWorkDispatch: Dispatch<ArtWorkDispatchAction>;
}) => {
  const [existingStars, setExistingStars] = useState<ReactSelectOption[]>([]);

  // const selectRef = useRef<Select<Option, true, GroupBase<Option>> | null>(
  //   null
  // );

  // set existing featuredStars available on allArtwork
  useEffect(() => {
    const tempStarsArr: ReactSelectOption[] = [];
    allArtWork.forEach((artWork) => {
      if (artWork.featuredStars && artWork.featuredStars.length > 0) {
        artWork.featuredStars.forEach((featuredStar) => {
          if (!tempStarsArr.some((tempStar) => tempStar.value === featuredStar))
            tempStarsArr.push({ value: featuredStar, label: featuredStar });
        });
      }
    });
    sort(tempStarsArr);
    setExistingStars([...tempStarsArr]);
  }, [allArtWork]);

  function handleChange(
    selectedOptions: MultiValue<ReactSelectOption>
    // , actionMeta: ActionMeta<ReactSelectOption>
  ) {
    const featuredStars = selectedOptions.map((star) => star.value);
    artWorkDispatch({ type: "featuredStars", payload: featuredStars });
  }

  return (
    <label className="flex flex-col sm:flex-row items-center py-2">
      <span className="text-sm sm:text-base md:text-lg pb-2 sm:pb-0">
        Featured Stars:
      </span>
      <CreatableSelect
        // ref={selectRef}
        id="stars"
        styles={customStyles}
        isMulti
        options={existingStars}
        value={artWorkState?.featuredStars?.map((star) => ({
          value: star,
          label: star,
        }))}
        onChange={handleChange}
      />
    </label>
  );
};
export default StarsField;
