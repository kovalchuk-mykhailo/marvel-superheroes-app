export interface MarvelResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Array<T>;
  };
}

interface IMarvelImage {
  path: string;
  extension: string;
}

export interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: IMarvelImage;
  // ... Data you're gonna use
}

export interface IMarvelComics {
  id: number;
  digitalId: number;
  title: string;
  description: string;
  thumbnail: IMarvelImage;
  images: Array<IMarvelImage>;
  // ... Data you're gonna use
}
