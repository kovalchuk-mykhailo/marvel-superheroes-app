export const MarvelEndpoints = {
  CHARACTERS: '/v1/public/characters',
  comicsByCharacterIDPattern: (id: string) => `/v1/public/characters/${id}/comics`
};
