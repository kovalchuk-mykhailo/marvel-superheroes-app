import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarvelCharacter } from '../../../types/marvel';
import { DEFAULT_PAGE_NUMBER } from '../../../utils/home-page-utils';
import type { RootState } from '../../store';

interface PaginatedCharacters {
  characters: Array<MarvelCharacter>;
  pagination: {
    totalPages: number;
    currentPage: number;
  };
}

// Define a type for the slice state
interface CharactersState {
  characters: Array<MarvelCharacter>;
  areLoading: boolean;
  errorText: string;
  pagination: {
    totalPages: number;
    currentPage: number;
  };
}

// Define the initial state using that type
const initialState: CharactersState = {
  characters: [],
  areLoading: false,
  errorText: '',
  pagination: {
    totalPages: DEFAULT_PAGE_NUMBER,
    currentPage: DEFAULT_PAGE_NUMBER
  }
};

export const charactersSlice = createSlice({
  name: 'characters',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.areLoading = action.payload;
    },
    setErrorText: (state, action: PayloadAction<string>) => {
      state.errorText = action.payload;
    },
    setCharacters: (state, action: PayloadAction<Array<MarvelCharacter>>) => {
      state.characters = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.pagination.totalPages = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setPaginatedCharacters: (state, action: PayloadAction<PaginatedCharacters>) => {
      state.pagination.currentPage = action.payload.pagination.currentPage;
      state.pagination.totalPages = action.payload.pagination.totalPages;
      state.characters = action.payload.characters;
    }
  }
});

export const {
  setLoading,
  setErrorText,
  setCharacters,
  setCurrentPage,
  setTotalPages,
  setPaginatedCharacters
} = charactersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCharactersState = (state: RootState) => state.charactersState;

export default charactersSlice.reducer;
