import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  RootState } from '../storeRedux';

export interface ProgressState {
  progress: number;
  total: number;
}


const initialState: ProgressState = {
  progress: 0,
  total:0
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    incrementProgress: (state, action: PayloadAction<number>) => {
      state.progress += action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

export const {incrementProgress, setTotal } = progressSlice.actions;

export const selectProgress = (state: RootState) => state.progress.progress;
export const selectTotal = (state: RootState) => state.progress.total;

export default progressSlice.reducer;