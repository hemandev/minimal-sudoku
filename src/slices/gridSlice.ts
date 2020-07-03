import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createNewGame } from 'utils';
import {
  Grid,
  N,
  Block,
  FilledBlock,
  difficultyLevel,
} from 'types';

interface GridState {
  solvedGrid: Grid;
  challengeGrid: Grid;
  activeGrid: Grid;
  selectedBlock: Block | null;
  remainingBlocks: number;
  difficulty: difficultyLevel;
}

const initialState: GridState = {
  ...createNewGame(),
  selectedBlock: null,
  difficulty: 'easy',
};

const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    startNewGame(state) {
      const { activeGrid, solvedGrid, challengeGrid } = createNewGame(state.difficulty);
      state.activeGrid = activeGrid;
      state.solvedGrid = solvedGrid;
      state.challengeGrid = challengeGrid;
    },
    resetGame(state) {
      state.activeGrid = state.challengeGrid;
    },
    selectBlock(state, action: PayloadAction<Block>) {
      state.selectedBlock = action.payload;
    },
    setDifficulty(state, action: PayloadAction<difficultyLevel>) {
      state.difficulty = action.payload;
    },
    fillBlock(
      state,
      { payload: { row, col, value } }: PayloadAction<FilledBlock>
    ) {
      state.activeGrid[row][col] = value as N;
    },
  },
});

export const {
  actions: { startNewGame, selectBlock, fillBlock, resetGame, setDifficulty },
  reducer: gridReducer,
} = gridSlice;
