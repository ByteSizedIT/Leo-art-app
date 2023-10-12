"use client";

import { useState } from "react";

const ArtWorkName = () => {
  const [artWorkName, setArtWorkName] = useState("");

  return (
    <label
      htmlFor="name"
      className="flex flex-col sm:flex-row items-center py-2"
    >
      <span className="text-sm sm:text-base md:text-lg pb-2 sm:pb-0">
        ArtWork Name:
      </span>
      <input
        className="w-full text-sm sm:text-base md:text-lg bg-transparent border-solid border-2 rounded-lg focus:outline-gray-500 ml-2 px-2 py-1 flex-1"
        id="name"
        type="text"
        value={artWorkName}
        onChange={(e) => setArtWorkName(e.target.value)}
        required
      />
    </label>
  );
};
export default ArtWorkName;
