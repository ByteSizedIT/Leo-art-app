"use client";

import React, { useEffect, useState, useRef } from "react";

import { Dispatch } from "react";

import { ArtWorkDispatchAction } from "../../types";

import CreatableSelect from "react-select/creatable";

import { ArtWork, ReactSelectOption as Option } from "../../types";

import { customStyles } from "@/app/_utils/react-select-styles";

import sort from "@/app/_utils/sortReactSelectOptions";

const TagsField = ({
  allArtWork,
  artWorkDispatch,
}: {
  allArtWork: ArtWork[];
  artWorkDispatch: Dispatch<ArtWorkDispatchAction>;
}) => {
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

  function handleChange(selectedOptions: Option[]) {
    console.log(selectedOptions);
    const tags = selectedOptions.map((tag) => tag.value);
    artWorkDispatch({ type: "tags", payload: tags });
  }

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
        onChange={handleChange}
      />
    </label>
  );
};
export default TagsField;
