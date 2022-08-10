export const MarvelEndpoints = {
  CHARACTERS: '/v1/public/characters',
  comicsByCharacterIDPattern: (id: number) => `/v1/public/characters/${id}/comics`
};
