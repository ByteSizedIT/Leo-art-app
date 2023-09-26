import { ArtWork } from "../types";

export default function shuffle(artArray: ArtWork[]) {
  return artArray.sort(() => Math.random() - 0.5);
}
