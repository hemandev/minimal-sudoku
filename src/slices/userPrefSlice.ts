import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserTheme } from 'types';

interface UserPrefState {
  theme: UserTheme;
}

const initialState: UserPrefState = {
  theme: 'light',
};

const userPrefSlice = createSlice({
  name: 'userPref',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<UserTheme>) {
      state.theme = action.payload;
    },
  },
});

export const {
  actions: { setTheme },
  reducer: userPrefReducer,
} = userPrefSlice;
