"use client";

import { useState } from "react";

import { firebaseAuth } from "../../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

import useAuthContext from "./useAuthContext";

const useSignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const { authDispatch } = useAuthContext();

  const router = useRouter();

  async function signUp(email: string, password: string, displayName: string) {
    console.log("signing up");
    console.log({ email, password, displayName });

    setError(null);
    setIsPending(true);

    try {
      // create user with firebaseAuth
      const response = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      if (!response) throw new Error("Could not complete sign up on firebase!");

      // console.log("User signed up as ", response.user);

      // add displayName to user in firebaseAuth

      // 'login' on vercel server to generate a session cookie in exchange for the provided ID token from firebase
      const cookieResponse = await fetch("/api/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await response.user.getIdToken()}`,
        },
      });

      if (!cookieResponse)
        throw new Error("No response from api/login POST request to vercel!");
      else if (cookieResponse.status === 200)
        console.log("logged in on vercel with 200 response");
      else
        console.log(
          "Failed to get a 200 response from api/login POST request to vercel"
        );

      // console.log({ cookieResponse });

      // dispatch login action to update local user authState
      authDispatch({ type: "LOG_IN", payload: response.user });

      // add user to firestore

      //redirect to homepage
      router.push("/");
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(error);
      console.log(message);
      // send error to logging service such as Sentry

      setError(message);
      setIsPending(false);
    }
  }

  return { isPending, error, signUp };
};

export default useSignUp;
