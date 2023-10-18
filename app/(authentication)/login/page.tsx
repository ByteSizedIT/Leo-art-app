"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import useAuthContext from "@/app/_hooks/useAuthContext";

import useLogIn from "@/app/_hooks/useLogIn";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authState } = useAuthContext();

  const router = useRouter();

  const { isPending, error, logIn } = useLogIn();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    logIn(email, password);
  }

  if (authState.authIsReady && authState?.user) return router.push("/");
  if (authState.authIsReady && !authState.user)
    return (
      <div className="flex flex-grow items-center justify-center p-5">
        <form
          className="w-full sm:w-96 flex flex-col rounded-lg border-solid border-2 border-[#ddd] shadow-md p-4"
          onSubmit={handleSubmit}
        >
          <h1>LOG IN</h1>
          <label htmlFor="email" className="w-full flex items-center py-2">
            <span className="text-sm sm:text-base md:text-lg">
              Email: {"   "}
            </span>
            <input
              className="text-sm sm:text-base md:text-lg bg-transparent border-solid border-2 rounded-lg outline-none focus:outline-gray-500 ml-2 px-2 py-1 flex-1"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password" className="py-2 w-full flex items-center">
            <span className="text-sm sm:text-base md:text-lg">Password: </span>
            <input
              className="text-sm sm:text-base md:text-lg bg-transparent border-solid border-2 rounded-lg outline-none focus:outline-gray-500 ml-2 px-2 py-1 flex-1"
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && (
            <p className="text-center text-red-600 text-xs sm:text-small md:text-base">
              {error}
            </p>
          )}
          {isPending && (
            <button
              type="submit"
              className="text-sm sm:text-base md:text-lg"
              disabled
            >
              Submitting...
            </button>
          )}
          {!isPending && (
            <button
              type="submit"
              className="w-1/2 mx-auto text-sm sm:text-base md:text-lg"
            >
              Submit
            </button>
          )}
          <p className="text-center">
            No Account? Click{" "}
            <span>
              <Link className="underline" href="/signup">
                here
              </Link>
            </span>{" "}
            to sign up
          </p>
        </form>
      </div>
    );
};
export default LoginPage;
