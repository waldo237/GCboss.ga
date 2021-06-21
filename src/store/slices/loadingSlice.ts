import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  RootState } from '../storeRedux';

const initialState: {s:string}={s: ""};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    resetLoading: (state) => {
      state.s = "";
    },
    setLoadingB: (state, action: PayloadAction<string>) => {
      state.s = action.payload;
    },
  },
});

export const {resetLoading, setLoadingB } = loadingSlice.actions;

export const selectLoading = (state: RootState) => state.loading.s;

export default loadingSlice.reducer;