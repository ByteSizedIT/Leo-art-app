"use client";

import React, { useEffect, useState, useRef } from "react";

import CreatableSelect from "react-select/creatable";

import { ArtWork, ReactSelectOption as Option } from "../../types";

import { customStyles } from "@/app/_utils/react-select-styles";

import sort from "@/app/_utils/sortReactSelectOptions";

const TagsField = ({ allArtWork }: { allArtWork: ArtWork[] }) => {
  const [existingTags, setExistingTags] = useState<Option[]>([]);

  // set existing Tags
  useEffect(() => {
    const tempTagsArr: Option[] = [];
    allArtWork.forEach((artWork) => {
      if (artWork.tags && artWork.tags.length > 0) {
        artWork?.tags?.forEach((featuredTag) => {
          if (!tempTagsArr.some((tempTag) => tempTag.value === featuredTag))
            tempTagsArr.push({
              value: featuredTag,
              label: featuredTag,
            });
        });
      }
    });

    sort(tempTagsArr);

    setExistingTags([...tempTagsArr]);
  }, [allArtWork]);

  return (
    <label className="flex flex-col sm:flex-row items-center py-2">
      <span className="text-sm sm:text-base md:text-lg pb-2 sm:pb-0">
        Tags:
      </span>
      <CreatableSelect
        id="tags"
        styles={customStyles}
        isMulti
        options={existingTags}
      />
    </label>
  );
};
export default TagsField;
