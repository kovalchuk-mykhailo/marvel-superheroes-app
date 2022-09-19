import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterOrderBy } from '../../../types/api';
import { DEFAULT_ORDER_BY_PARAM_VALUE } from '../../../utils/home-page-utils';
import type { RootState } from '../../store';

// Define a type for the slice state
interface SearchInputsState {
  enteredName: string;
  lastSearchedName: string | undefined;
  orderByValue: CharacterOrderBy;
}

// Define the initial state using that type
const initialState: SearchInputsState = {
  enteredName: '',
  lastSearchedName: undefined,
  orderByValue: DEFAULT_ORDER_BY_PARAM_VALUE
};

export const searchInputsSlice = createSlice({
  name: 'search-inputs',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOrderByValue: (state, action: PayloadAction<CharacterOrderBy>) => {
      state.orderByValue = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setEnteredName: (state, action: PayloadAction<string>) => {
      state.enteredName = action.payload;
    },
    setLastSearchedText: (state, action: PayloadAction<string | undefined>) => {
      state.lastSearchedName = action.payload;
    }
  }
});

export const { setOrderByValue, setEnteredName, setLastSearchedText } = searchInputsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearchInputsState = (state: RootState) => state.searchInputs;

export default searchInputsSlice.reducer;
