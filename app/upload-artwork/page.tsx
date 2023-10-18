import { getAllArtWork } from "../_utils/getAllArt";

import { ArtWorkDownload } from "../types";

import UploadForm from "../components/upload-form/UploadForm";

export const revalidate = 300;

const UploadArtwork = async () => {
  const allArtWork: ArtWorkDownload[] = await getAllArtWork();

  return (
    <div className="w-full flex flex-col justify-center items-center text-center mx-auto p-5">
      <h1>UPLOAD NEW ARTWORK</h1>
      <UploadForm allArtWork={allArtWork} />
    </div>
  );
};
export default UploadArtwork;
