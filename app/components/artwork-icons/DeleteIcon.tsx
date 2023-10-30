"use client";

import { useState, useEffect } from "react";

import { RiDeleteBin6Line } from "react-icons/ri";

import { doc, deleteDoc } from "firebase/firestore";

import { ref, deleteObject } from "firebase/storage";

import { firestoreDB, firebaseStorage } from "@/firebase/firebase-config";

import { redirect, useRouter } from "next/navigation";

import useAuthContext from "@/app/_hooks/useAuthContext";

const DeleteIcon = ({
  artWorkName,
  artWorkID,
  artWorkURL,
}: {
  artWorkName: string;
  artWorkID: string;
  artWorkURL: string;
}) => {
  const [showModal, setShowModal] = useState(false);

  const { authState } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    console.log({ showModal });
  }, [showModal]);

  if (!authState.user?.isAdmin) return;

  async function deleteArtWork() {
    // extract filename from token url
    // const extracted = artWorkURL?.match(/\/([^\/?#]+)(\?|$)/);
    // const filename = extracted ? extracted[1] : null;
    const filename = artWorkURL?.split("/")?.pop()?.split("?")[0];

    // Create a reference to the file to delete
    const artWorkRef = ref(firebaseStorage, filename);

    try {
      router.push("/");
      await deleteDoc(doc(firestoreDB, "artworks", artWorkID));
      await deleteObject(artWorkRef);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.log(message);
      // send error to logging service such as Sentry
    }
  }

  return (
    <>
      <button
        className="icon-button"
        // border-solid border-2 rounded-lg outline-none hover:outline-gray-500 m-6 p-2
        onClick={() => setShowModal(true)}
      >
        <RiDeleteBin6Line className="inline-block" /> delete
      </button>
      {showModal && (
        <div className="z-50">
          <div
            className={`${
              showModal ? "block" : "hidden"
            } w-screen h-screen absolute left-0 top-0 bg-black z-20 bg-opacity-40 flex items-center justify-center`}
          >
            <div className="bg-gray-50 w-1/2 h-1/2 z-50 bg-opacity-100 relative flex flex-col items-center justify-center">
              <button
                className="icon-button absolute top-0 right-0"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>

              <p>
                Are you sure you want to delete the artwork
                <p className="font-bold">
                  {artWorkName}
                  <span className="font-normal">?</span>
                </p>
              </p>

              <div className="flex">
                <button onClick={deleteArtWork}>Yep, delete!</button>
                <button onClick={() => setShowModal(false)}>Nooooooo...</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DeleteIcon;
