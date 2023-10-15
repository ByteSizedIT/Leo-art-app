"use client";

import React, { useEffect, useState, useRef } from "react";

import { Dispatch } from "react";

import { ArtWorkDispatchAction } from "../../types";

import CreatableSelect from "react-select/creatable";

import { MultiValue, ActionMeta } from "react-select";

import { ArtWork, ReactSelectOption } from "../../types";

import { customStyles } from "@/app/_utils/react-select-styles";

import sort from "@/app/_utils/sortReactSelectOptions";

const ProductTypesField = ({
  allArtWork,
  artWorkDispatch,
}: {
  allArtWork: ArtWork[];
  artWorkDispatch: Dispatch<ArtWorkDispatchAction>;
}) => {
  const [existingProductTypes, setExistingProductTypes] = useState<
    ReactSelectOption[]
  >([]);

  // set existing ProductTypes
  useEffect(() => {
    const tempProductTypesArr: ReactSelectOption[] = [];
    allArtWork.forEach((artWork) => {
      if (artWork.productTypes && artWork.productTypes.length > 0) {
        artWork.productTypes.forEach((featuredProductType) => {
          if (
            !tempProductTypesArr.some(
              (tempProductType) => tempProductType.value === featuredProductType
            )
          )
            tempProductTypesArr.push({
              value: featuredProductType,
              label: featuredProductType,
            });
        });
      }
    });

    sort(tempProductTypesArr);

    setExistingProductTypes([...tempProductTypesArr]);
  }, [allArtWork]);

  function handleChange(selectedOptions: MultiValue<ReactSelectOption>) {
    console.log(selectedOptions);
    const productTypes = selectedOptions.map(
      (productType) => productType.value
    );
    artWorkDispatch({ type: "productTypes", payload: productTypes });
  }

  return (
    <label className="flex flex-col sm:flex-row items-center py-2">
      <span className="text-sm sm:text-base md:text-lg pb-2 sm:pb-0">
        Product Types:
      </span>
      <CreatableSelect
        id="productTypes"
        styles={customStyles}
        isMulti
        options={existingProductTypes}
        onChange={handleChange}
      />
    </label>
  );
};

export default ProductTypesField;
