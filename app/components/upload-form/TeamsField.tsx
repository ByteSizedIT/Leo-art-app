"use client";

import React, { useEffect, useState, useRef } from "react";

import CreatableSelect from "react-select/creatable";

import { ArtWork, ReactSelectOption as Option } from "../../types";

import { customStyles } from "@/app/_utils/react-select-styles";

import sort from "@/app/_utils/sortReactSelectOptions";

const TeamsField = ({ allArtWork }: { allArtWork: ArtWork[] }) => {
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
      />
    </label>
  );
};
export default TeamsField;
