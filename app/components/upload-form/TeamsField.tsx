"use client";

import React, { useEffect, useState, useRef } from "react";

import { Dispatch } from "react";

import { ArtWorkDispatchAction } from "../../types";

import CreatableSelect from "react-select/creatable";

import { ArtWork, ReactSelectOption as Option } from "../../types";

import { customStyles } from "@/app/_utils/react-select-styles";

import sort from "@/app/_utils/sortReactSelectOptions";

const TeamsField = ({
  allArtWork,
  artWorkDispatch,
}: {
  allArtWork: ArtWork[];
  artWorkDispatch: Dispatch<ArtWorkDispatchAction>;
}) => {
  const [existingTeams, setExistingTeams] = useState<Option[]>([]);

  // set existing teams
  useEffect(() => {
    const tempTeamsArr: Option[] = [];
    allArtWork.forEach((artWork) => {
      if (artWork.featuredTeams && artWork.featuredTeams.length > 0) {
        artWork.featuredTeams.forEach((featuredTeam) => {
          if (!tempTeamsArr.some((tempTeam) => tempTeam.value === featuredTeam))
            tempTeamsArr.push({
              value: featuredTeam,
              label: featuredTeam,
            });
        });
      }
    });

    sort(tempTeamsArr);

    setExistingTeams([...tempTeamsArr]);
  }, [allArtWork]);

  function handleChange(selectedOptions: Option[]) {
    console.log(selectedOptions);
    const featuredTeams = selectedOptions.map((team) => team.value);
    artWorkDispatch({ type: "featuredTeams", payload: featuredTeams });
  }

  return (
    <label className="flex flex-col sm:flex-row items-center py-2">
      <span className="text-sm sm:text-base md:text-lg pb-2 sm:pb-0">
        Featured Teams:
      </span>
      <CreatableSelect
        id="teams"
        styles={customStyles}
        isMulti
        options={existingTeams}
        onChange={handleChange}
      />
    </label>
  );
};
export default TeamsField;
