interface ArtWork {
  id: string;
  name: string;
  description: string;
  collections?: string[];
  featuredStars?: string[];
  featuredTeams?: string[];
  productTypes?: string[];
  tags: string[];
  imageURL: string;
}

interface ReactSelectOption {
  value: string;
  label: string;
}

export type { ArtWork, ReactSelectOption };
