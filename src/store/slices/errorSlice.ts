import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  RootState } from '../storeRedux';

export interface ErrorState {
  id: string;
  date: string;
  message:string;
  comingFrom:string
}

const initialState: ErrorState[] = [];

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<ErrorState>) => {
      state.push(action.payload);
    },
  },
});

export const { addError } = errorSlice.actions;

export const selectError = (state: RootState) => state.error;



export default errorSlice.reducer;