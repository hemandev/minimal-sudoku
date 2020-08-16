import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SudokuWorker from 'worker-loader!../worker/sudoku.worker.ts';

import { rootReducer } from './rootReducer';
import { saveState, loadState } from 'utils';
import { applyWorker } from 'workerize-redux';

const sudokuWorker = new SudokuWorker() as Worker;

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: loadState(),
  middleware: [...getDefaultMiddleware(), applyWorker(sudokuWorker)],
});

store.subscribe(() => {
  const gridReducer = store.getState().gridReducer;
  const newGridReducer = {
    ...gridReducer,
    selectedBlock: null,
    victoryModalOpen: false,
  };
  saveState({ ...store.getState(), gridReducer: newGridReducer });
});

export type AppDispatch = typeof store.dispatch;
