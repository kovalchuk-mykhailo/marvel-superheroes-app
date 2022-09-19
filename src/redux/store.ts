import { configureStore } from '@reduxjs/toolkit';
import charactersSlice from './features/characters/charactersSlice';
import searchInputsSlice from './features/search-inputs/searchInputsSlice';

export const store = configureStore({
  reducer: {
    charactersState: charactersSlice,
    searchInputs: searchInputsSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
