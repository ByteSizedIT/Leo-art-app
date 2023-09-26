"use client";

// https://vercel.com/guides/react-context-state-management-nextjs#using-context-in-client-components

import { createContext, useContext, useState } from "react";

interface SearchContextType {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType>({
  searchText: "",
  setSearchText: () => {},
});

export default function SearchTextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
}
