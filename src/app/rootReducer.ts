import { combineReducers } from '@reduxjs/toolkit';

import { gridReducer } from '../slices/gridSlice';

export const rootReducer = combineReducers({ gridReducer });

export type RootState = ReturnType<typeof rootReducer>;
