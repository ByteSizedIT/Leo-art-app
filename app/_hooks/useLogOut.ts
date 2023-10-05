import { useState } from "react";

import { firebaseAuth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import useAuthContext from "./useAuthContext";

const useLogOut = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const { authDispatch } = useAuthContext();

  const router = useRouter();

  async function logOut() {
    console.log("logging out");

    setError(null);
    setIsPending(true);

    try {
      // sign out
      await signOut(firebaseAuth);

      // dispatch login action to update local user authState
      authDispatch({ type: "LOG_OUT", payload: null });

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

  return { isPending, error, logOut };
};
export default useLogOut;
