export interface ArtWork {
  name: string;
  description: string;
  featuredStars?: Array<string>;
  featuredTeams?: string[];
  collections?: string[];
  tags?: string[];
  productTypes?: string[];
  imageURL: string;
}

export interface ArtworkUpload extends ArtWork {
  image: File | null;
}

export interface ArtWorkDownload extends ArtWork {
  id: string;
}

export interface ArtWorkDispatchAction {
  type: string;
  payload: string | Array<string> | File;
}

export interface ReactSelectOption {
  value: string;
  label: string;
}
