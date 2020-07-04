import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createNewGame, checkSolution } from 'utils';
import { Grid, N, Block, FilledBlock, difficultyLevel } from 'types';

interface GridState {
  solvedGrid: Grid;
  challengeGrid: Grid;
  activeGrid: Grid;
  selectedBlock: Block | null;
  moves: number;
  actualRemainingBlocks: number;
  remainingBlocks: number;
  victoryModalOpen: boolean;
  difficulty: difficultyLevel;
}

const initialState: GridState = {
  ...createNewGame(),
  selectedBlock: null,
  difficulty: 'easy',
  victoryModalOpen: false,
  moves: 0,
};

const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    startNewGame(state) {
      const {
        activeGrid,
        solvedGrid,
        challengeGrid,
        remainingBlocks,
        actualRemainingBlocks,
      } = createNewGame(state.difficulty);
      state.activeGrid = activeGrid;
      state.solvedGrid = solvedGrid;
      state.challengeGrid = challengeGrid;
      state.actualRemainingBlocks = actualRemainingBlocks;
      state.remainingBlocks = remainingBlocks;
      state.moves = 0;
      state.victoryModalOpen = false;
    },
    resetGame(state) {
      state.activeGrid = state.challengeGrid;
      state.remainingBlocks = state.actualRemainingBlocks;
      state.moves = 0;
      state.victoryModalOpen = false;
    },
    selectBlock(state, action: PayloadAction<Block>) {
      state.selectedBlock = action.payload;
    },
    setDifficulty(state, action: PayloadAction<difficultyLevel>) {
      state.difficulty = action.payload;
    },
    closeModal(state) {
      state.victoryModalOpen = false;
    },
    fillBlock(
      state,
      { payload: { row, col, value } }: PayloadAction<FilledBlock>
    ) {
      const previousValue = state.activeGrid[row][col];
      if (!previousValue) {
        state.remainingBlocks--;
      }
      if (value !== previousValue && !state.victoryModalOpen) {
        state.moves++;
      }

      state.activeGrid[row][col] = value as N;
      if (!state.remainingBlocks) {
        const isCorrect = checkSolution(state.activeGrid, state.solvedGrid);
        if (isCorrect) {
          state.victoryModalOpen = true;
        }
      }
    },
  },
});

export const {
  actions: {
    startNewGame,
    selectBlock,
    fillBlock,
    resetGame,
    setDifficulty,
    closeModal,
  },
  reducer: gridReducer,
} = gridSlice;
