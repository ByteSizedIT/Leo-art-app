"use client";

import React, { useEffect, useState } from "react";

import { Dispatch } from "react";

import { ArtWorkDispatchAction } from "../../types";

import CreatableSelect from "react-select/creatable";

import { MultiValue, ActionMeta } from "react-select";

import { ArtWork, ReactSelectOption, ArtworkUpload } from "../../types";

import { customStyles } from "@/app/_utils/react-select-styles";

import sort from "@/app/_utils/sortReactSelectOptions";

const TeamsField = ({
  allArtWork,
  artWorkState,
  artWorkDispatch,
}: {
  allArtWork: ArtWork[];
  artWorkState?: ArtworkUpload;
  artWorkDispatch: Dispatch<ArtWorkDispatchAction>;
}) => {
  const [existingTeams, setExistingTeams] = useState<ReactSelectOption[]>([]);

  // set existing teams
  useEffect(() => {
    const tempTeamsArr: ReactSelectOption[] = [];
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

  function handleChange(
    selectedOptions: MultiValue<ReactSelectOption>
    // , actionMeta: ActionMeta<ReactSelectOption>
  ) {
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
        value={artWorkState?.featuredTeams?.map((team) => ({
          value: team,
          label: team,
        }))}
        onChange={handleChange}
      />
    </label>
  );
};
export default TeamsField;
