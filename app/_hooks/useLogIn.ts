"use client";

import { useState } from "react";

import { firebaseAuth } from "../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

import useAuthContext from "./useAuthContext";

const useLogIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const { authDispatch } = useAuthContext();

  const router = useRouter();

  async function logIn(email: string, password: string) {
    // console.log("logging in");
    // console.log({ email, password });

    setError(null);
    setIsPending(true);

    try {
      // sign in user with firebaseAuth
      const response = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      if (!response) throw new Error("Could not log in on firebase!");

      console.log("User logged in as ", response.user);

      // 'login' on vercel server to generate a session cookie in exchange for the provided ID token from firebase
      const cookieResponse = await fetch("/api/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await response.user.getIdToken()}`,
        },
      });
      // console.log({ cookieResponse });
      if (!cookieResponse.ok)
        throw new Error("No response from api/login POST request to vercel!");
      else if (cookieResponse.status === 200)
        console.log("logged in on vercel with 200 response");
      else
        console.log(
          "Failed to get a 200 response from api/login POST request to vercel"
        );

      // get user token and check if user is admin
      const tokenResult = await response.user.getIdTokenResult();
      const isAdmin = !!tokenResult.claims.admin;
      console.log("Is admin user: ", isAdmin);

      // dispatch login action to update local user authState, adding in isAdmin
      // - only gives access to upload-artwork Link in navbar
      // upload-artwork page is protected on 'verel' server by middleware
      // UploadingDocs is protected by rules
      authDispatch({
        type: "LOG_IN",
        payload: { ...response.user, isAdmin },
      });

      //redirect to homepage
      router.push("/");
    } catch (err) {
      let message;
      if (err instanceof Error) {
        message = err.message;
      } else message = String(error);
      // send error to logging service such as Sentry

      setError(message);
      setIsPending(false);
    }
  }

  return { isPending, error, logIn };
};

export default useLogIn;
