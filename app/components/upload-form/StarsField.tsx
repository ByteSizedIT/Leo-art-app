"use client";

import React, { useEffect, useState, useRef } from "react";

import CreatableSelect from "react-select/creatable";

// import Select from "react-select/dist/declarations/src/Select";

// import { GroupBase } from "react-select";

import { ArtWork, ReactSelectOption as Option } from "../../types";

import { customStyles } from "@/app/_utils/react-select-styles";

import sort from "@/app/_utils/sortReactSelectOptions";

const StarsField = ({ allArtWork }: { allArtWork: ArtWork[] }) => {
  const [existingStars, setExistingStars] = useState<Option[]>([]);

  // const selectRef = useRef<Select<Option, true, GroupBase<Option>> | null>(
  //   null
  // );

  // set existing stars
  useEffect(() => {
    const tempStarsArr: Option[] = [];
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

  function handleChange(selectedOptions: any) {
    console.log(selectedOptions);
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
        onChange={handleChange}
      />
    </label>
  );
};
export default StarsField;
