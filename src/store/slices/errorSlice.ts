import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../storeRedux';

export interface ErrorState {
  id: string;
  date: string;
  message: string;
  comingFrom: string
}

const initialState: { errs: ErrorState[], show: boolean } = { errs: [], show: false };

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addError: (state, action: PayloadAction<ErrorState>) => {
      state.errs.push(action.payload);
    },
    clearErrors: (state, action:PayloadAction<[]>) => {
      state.errs = action.payload;
    },
    toggle: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    }
  },
});

export const { addError, toggle, clearErrors } = errorSlice.actions;

export const selectError = (state: RootState) => state.error.errs;
export const selectErrShow = (state: RootState) => state.error.show;

export default errorSlice.reducer;