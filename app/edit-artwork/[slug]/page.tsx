import UploadForm from "@/app/components/upload-form/UploadForm";

import { getAllArtWork } from "../../_utils/getAllArt";

import { ArtWorkDownload } from "../../types";

const EditArtWorkPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const allArtWork: ArtWorkDownload[] = await getAllArtWork();

  const artToEdit = allArtWork.find((artWork) => artWork.id === slug);

  return (
    <div className="w-full flex-grow flex flex-col justify-center items-center text-center mx-auto p-5">
      <h1>
        EDIT &apos;{artToEdit?.name.toUpperCase()}&apos;
        {"  "}
        DETAILS
      </h1>
      <UploadForm
        allArtWork={allArtWork}
        artToEdit={artToEdit}
        artWorkID={slug}
      />
    </div>
  );
};

export default EditArtWorkPage;
