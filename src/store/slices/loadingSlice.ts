import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  RootState } from '../storeRedux';

const initialState: string = "";

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    resetLoading: (state) => {
      state = "";
    },
    setLoadingB: (state, action: PayloadAction<string>) => {
      state = action.payload;
    },
  },
});

export const {resetLoading, setLoadingB } = loadingSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default loadingSlice.reducer;