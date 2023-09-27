import Link from "next/link";

import Logo from "../components/Logo";
import SearchForm from "./SearchForm";

const NavBar = () => {
  return (
    <nav className="relative w-full flex items-center gap-5 md:gap-10 mx-auto p-5 z-10">
      <Logo />
      <SearchForm placement={"navbar"} />
      <Link href="/" className="text-gray-500 hover:text-black">
        ART
      </Link>
      <Link href="/about" className="text-gray-500 hover:text-black">
        ABOUT
      </Link>
      <Link href="/login" className="text-gray-500 hover:text-black pr-5">
        LOG IN
      </Link>
    </nav>
  );
};
export default NavBar;
