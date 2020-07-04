import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './rootReducer';
import { saveState, loadState } from 'utils';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: loadState(),
});

store.subscribe(() => {
  const gridReducer = store.getState().gridReducer;
  const newGridReducer = { ...gridReducer, selectedBlock: null };
  saveState({ ...store.getState(), gridReducer: newGridReducer });
});

export type AppDispatch = typeof store.dispatch;
