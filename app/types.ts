export interface ArtworkUpload {
  name: string;
  description: string;
  featuredStars?: Array<string>;
  featuredTeams?: string[];
  collections?: string[];
  tags?: string[];
  productTypes?: string[];
  imageURL: string;
}

export interface ArtWorkDispatchAction {
  type: string;
  payload: string | Array<string>;
}

interface ArtWork extends ArtworkUpload {
  id: string;
}

interface ReactSelectOption {
  value: string;
  label: string;
}

export type { ArtWork, ReactSelectOption };
