"use client";

import { useReducer, useEffect } from "react";

import { firestoreDB } from "../../../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";

import { ArtWorkDownload } from "@/app/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeState {
  totalLikes: number;
  liked: boolean;
}

interface Action {
  type: string;
}

function likeReducer(prevLikeState: LikeState, action: Action) {
  switch (action.type) {
    case "increment":
      return {
        ...prevLikeState,
        liked: true,
        totalLikes: prevLikeState.totalLikes + 1,
      };
    case "decrement":
      return {
        ...prevLikeState,
        liked: false,
        totalLikes:
          prevLikeState.totalLikes > 0 ? prevLikeState.totalLikes - 1 : 0,
      };
    default:
      return prevLikeState;
  }
}

const LikeIcon = ({ artWork }: { artWork: ArtWorkDownload }) => {
  const initialLikeState = {
    totalLikes: artWork.totalLikes || 0,
    liked:
      // nb server an error when NextJS runs a server render b4 the client render ... https://developer.school/snippets/react/localstorage-is-not-defined-nextjs
      // -  https://stackoverflow.com/questions/72829305/prop-classname-did-not-match-server-and-client ... see import of LikeIcon clinet in atwork/[slug]/page.tsx
      localStorage?.getItem(`${artWork.id} liked`) === "true",
  };

  const [likeState, likeDispatch] = useReducer(likeReducer, initialLikeState);

  useEffect(() => {
    if (likeState && artWork.id) {
      const artWorkRef = doc(firestoreDB, "artworks", artWork.id);
      setDoc(artWorkRef, { totalLikes: likeState.totalLikes }, { merge: true });
    }
  }, [likeState, artWork.id]);

  const handleLike = () => {
    if (!likeState.liked) {
      localStorage.setItem(`${artWork.id} liked`, "true");
      likeDispatch({ type: "increment" });
    } else {
      localStorage.setItem(`${artWork.id} liked`, "false");
      likeDispatch({ type: "decrement" });
    }
  };

  return (
    <div
      className="flex items-center gap-2 p-6 cursor-pointer"
      onClick={handleLike}
    >
      <AiOutlineHeart
        className={`${
          likeState.liked ? "hidden" : "inline-block animate-ping"
        }`}
      />

      <AiFillHeart
        className={`${
          likeState.liked ? "inline-block " : "hidden "
        } text-pink-500 scale-150 `}
      />

      <p>{`${likeState.totalLikes || 0} likes`}</p>
    </div>
  );
};
export default LikeIcon;
