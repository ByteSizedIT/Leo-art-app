"use client";

import React, { useEffect, useState, useRef } from "react";

import { Dispatch } from "react";

import { ArtWorkDispatchAction } from "../../types";

import CreatableSelect from "react-select/creatable";

import { MultiValue, ActionMeta } from "react-select";

import { ArtWork, ReactSelectOption, ArtworkUpload } from "../../types";

import { customStyles } from "@/app/_utils/react-select-styles";

import sort from "@/app/_utils/sortReactSelectOptions";

const TagsField = ({
  allArtWork,
  artWorkState,
  artWorkDispatch,
}: {
  allArtWork: ArtWork[];
  artWorkState?: ArtworkUpload;
  artWorkDispatch: Dispatch<ArtWorkDispatchAction>;
}) => {
  const [existingTags, setExistingTags] = useState<ReactSelectOption[]>([]);

  // set existing Tags
  useEffect(() => {
    const tempTagsArr: ReactSelectOption[] = [];
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

  function handleChange(
    selectedOptions: MultiValue<ReactSelectOption>
    // , actionMeta: ActionMeta<ReactSelectOption>
  ) {
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
        value={artWorkState?.tags?.map((tag) => ({
          value: tag,
          label: tag,
        }))}
        onChange={handleChange}
      />
    </label>
  );
};
export default TagsField;
