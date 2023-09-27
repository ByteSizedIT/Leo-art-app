"use client";

import { useContext } from "react";
import { SearchContext } from "../_context/search-provider";

const SearchForm = ({ placement }: { placement: string }) => {
  function updateSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  const { searchText, setSearchText } = useContext(SearchContext);

  return (
    <form
      className={`${
        placement === "navbar"
          ? "hidden md:block"
          : "mb-4 text-center md:hidden "
      }`}
    >
      <input
        className="bg-transparent border-solid border-2 rounded-lg outline-none focus:outline-gray-500 px-2 py-1"
        type="text"
        placeholder="Search Art"
        value={searchText}
        onChange={updateSearch}
      />
    </form>
  );
};

export default SearchForm;
