import { combineReducers } from '@reduxjs/toolkit';

import { gridReducer } from '../slices/gridSlice';
import { userPrefReducer } from '../slices/userPrefSlice';

export const rootReducer = combineReducers({ gridReducer, userPrefReducer });

export type RootState = ReturnType<typeof rootReducer>;
