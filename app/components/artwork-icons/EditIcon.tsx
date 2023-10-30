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
      onClick={() => router.push(`/edit/${artWorkID}`)}
    >
      <GrEdit />
      edit
    </button>
  );
};
export default EditIcon;
