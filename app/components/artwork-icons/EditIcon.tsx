"use client";

import { useRouter } from "next/navigation";

import { GrEdit } from "react-icons/gr";

import useAuthContext from "@/app/_hooks/useAuthContext";

const EditIcon = ({ artWorkID }: { artWorkID: string }) => {
  const router = useRouter();
  const { authState } = useAuthContext();

  if (!authState.user?.isAdmin) return;

  return (
    <button
      className="icon-button"
      onClick={() => router.push(`/edit-artwork/${artWorkID}`)}
    >
      <GrEdit />
      <p className="pl-2">edit</p>
    </button>
  );
};
export default EditIcon;
