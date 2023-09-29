"use client";

import Link from "next/link";
import useAuthContext from "../_hooks/useAuthContext";

import useLogOut from "../_hooks/useLogOut";

const LogInOut = () => {
  const { authState } = useAuthContext();

  const { logOut } = useLogOut();

  function handleClick() {
    logOut();
  }

  return (
    <>
      {!authState?.user ? (
        <Link href="/login" className="text-gray-500 hover:text-black pr-5">
          LOG IN
        </Link>
      ) : (
        <p
          className="text-gray-500 hover:text-black  pr-5 text-base cursor-pointer"
          onClick={handleClick}
        >
          LOG OUT
        </p>
      )}
    </>
  );
};
export default LogInOut;
