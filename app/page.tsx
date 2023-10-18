import { getAllArtWork } from "./_utils/getAllArt";
import shuffle from "./_utils/shuffle";
import Gallery from "./components/Gallery";

import { ArtWorkDownload } from "./types";

export const revalidate = 300;

async function Home() {
  let allArtWork: ArtWorkDownload[] = await getAllArtWork();
  shuffle(allArtWork);

  return (
    <main className="w-full max-w-7xl flex flex-col justify-center items-center mx-auto p-10">
      <Gallery allArtWork={allArtWork} />
    </main>
  );
}
export default Home;
