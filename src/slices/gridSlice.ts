import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createNewGame } from 'utils';
import { Grid, N, Block, FilledBlock } from 'types';

interface GridState {
  solvedGrid: Grid;
  challengeGrid: Grid;
  activeGrid: Grid;
  selectedBlock: Block | null;
  remainingBlocks: number;
}

const initialState: GridState = {
  ...createNewGame(),
  selectedBlock: null,
};

const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    startNewGame(state) {
      const { activeGrid, solvedGrid, challengeGrid } = createNewGame();
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
    fillBlock(
      state,
      { payload: { row, col, value } }: PayloadAction<FilledBlock>
    ) {
      state.activeGrid[row][col] = value as N;
    },
  },
});

export const {
  actions: { startNewGame, selectBlock, fillBlock, resetGame },
  reducer: gridReducer,
} = gridSlice;
