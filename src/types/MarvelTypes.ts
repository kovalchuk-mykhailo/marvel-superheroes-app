export interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    // Image
    path: string;
    extension: string;
  };
  // ... Data you're gonna use
}

export interface MarvelResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Array<T>;
  };
}
