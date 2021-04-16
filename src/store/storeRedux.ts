import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import errorSlice from './slices/errorSlice';
import progressReducer from './slices/progressSlice';
import { composeWithDevTools } from 'redux-devtools-extension';
export const storeRedux = configureStore({
  reducer: {
    progress: progressReducer,
    error:errorSlice
  },
  devTools:(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools()
});

export type AppDispatch = typeof storeRedux.dispatch;
export type RootState = ReturnType<typeof storeRedux.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;