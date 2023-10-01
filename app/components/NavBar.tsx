import Link from "next/link";

import Logo from "../components/Logo";
import NavBarElements from "./NavBarElements";

const NavBar = () => {
  return (
    <nav className="relative w-full flex items-center gap-3 md:gap-10 mx-auto p-5 z-10">
      <Logo />
      <NavBarElements />
    </nav>
  );
};
export default NavBar;
