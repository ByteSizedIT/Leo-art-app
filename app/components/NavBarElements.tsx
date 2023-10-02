"use client";

import Link from "next/link";

import useAuthContext from "../_hooks/useAuthContext";

import SearchForm from "./SearchForm";
import LogInOut from "./LogInOut";

const NavBarElements = () => {
  const { authState } = useAuthContext();

  if (authState?.authIsReady)
    return (
      <div className="hidden md:flex items-center gap-10 z-10 ">
        <SearchForm placement={"navbar"} />
        <Link href="/" className="text-gray-500 hover:text-black">
          GALLERY
        </Link>
        <Link href="/about" className="text-gray-500 hover:text-black">
          ABOUT
        </Link>
        <LogInOut />
      </div>
    );
};

export default NavBarElements;
