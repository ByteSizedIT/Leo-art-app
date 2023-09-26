import getAllArtWork from "./_utils/getArt";
import shuffle from "./_utils/shuffle";

import { ArtWork } from "./types";

async function Home() {
  let allArtWork: ArtWork[] = await getAllArtWork();
  shuffle(allArtWork);

  return (
    <main className="">
      <div className="">
        {allArtWork.map((artWork) => (
          <>
            <p key={artWork.id}>{artWork.name}</p>
          </>
        ))}
      </div>
    </main>
  );
}
export default Home;
