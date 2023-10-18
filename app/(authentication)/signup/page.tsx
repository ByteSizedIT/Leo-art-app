"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import useAuthContext from "@/app/_hooks/useAuthContext";

import useSignUp from "@/app/_hooks/useSignUp";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { authState } = useAuthContext();

  const router = useRouter();

  const { isPending, error, signUp } = useSignUp();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signUp(email, password, displayName);
  }

  if (authState.authIsReady && authState?.user) return router.push("/");
  if (authState.authIsReady && !authState.user)
    return (
      <div className="flex flex-grow items-center justify-center p-5">
        <form
          className="w-full sm:w-96 flex flex-col rounded-lg border-solid border-2 border-[#ddd] shadow-md p-4"
          onSubmit={handleSubmit}
        >
          <h1>SIGN UP</h1>
          <label htmlFor="email" className="w-full flex items-center py-2">
            <span className="text-sm sm:text-base md:text-lg">Email: </span>
            <input
              className="text-sm sm:text-base md:text-lg bg-transparent border-solid border-2 rounded-lg outline-none focus:outline-gray-500 ml-2 px-2 py-1 flex-1"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password" className="w-full flex items-center py-2">
            <span className="text-sm sm:text-base md:text-lg">Password: </span>
            <input
              className="text-sm sm:text-base md:text-lg bg-transparent border-solid border-2 rounded-lg outline-none focus:outline-gray-500 ml-2 px-2 py-1 flex-1"
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label
            htmlFor="displayName"
            className="w-full flex items-center py-2"
          >
            <span className="text-sm sm:text-base md:text-lg">
              Display Name:{" "}
            </span>
            <input
              className="text-sm sm:text-base md:text-lg bg-transparent border-solid border-2 rounded-lg outline-none focus:outline-gray-500 mx-2 px-2 py-1 flex-1"
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </label>
          {error && (
            <p className="text-center text-red-600 text-xs sm:text-small md:text-base">
              {error}
            </p>
          )}
          {isPending && (
            <button className="w-1/2 mx-auto text-sm sm:text-base md:text-lg disabled">
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
            Already signed up? Click{" "}
            <span>
              <Link className="underline" href="/login">
                here
              </Link>
            </span>{" "}
            to log in
          </p>
        </form>
      </div>
    );
};

export default SignUpPage;
