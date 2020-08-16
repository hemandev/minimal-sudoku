import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createNewGame, checkSolution } from 'utils';
import { Grid, N, Block, FilledBlock, NewGame, difficultyLevel } from 'types';

interface GridState {
  solvedGrid: Grid;
  challengeGrid: Grid;
  activeGrid: Grid;
  selectedBlock: Block | null;
  moves: number;
  actualRemainingBlocks: number;
  remainingBlocks: number;
  loading: boolean;
  hideClues: boolean;
  victoryModalOpen: boolean;
  difficulty: difficultyLevel;
}

type CREATE_NEW_GAME_IN_WORKER = 'CREATE_NEW_GAME_IN_WORKER';
const CREATE_NEW_GAME_IN_WORKER = 'CREATE_NEW_GAME_IN_WORKER';

export interface NewGameWorkerAction {
  type: CREATE_NEW_GAME_IN_WORKER;
  worker: boolean;
  successActionType: string;
}

const initialState: GridState = {
  ...createNewGame(),
  selectedBlock: null,
  difficulty: 'easy',
  loading: false,
  hideClues: false,
  victoryModalOpen: false,
  moves: 0,
};

const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    startNewGame(state, action: PayloadAction<NewGame>) {
      const {
        activeGrid,
        solvedGrid,
        challengeGrid,
        remainingBlocks,
        actualRemainingBlocks,
      } = action.payload;

      state.activeGrid = activeGrid;
      state.solvedGrid = solvedGrid;
      state.challengeGrid = challengeGrid;
      state.actualRemainingBlocks = actualRemainingBlocks;
      state.remainingBlocks = remainingBlocks;
      state.moves = 0;
      state.loading = false;
      state.selectedBlock = null;
      state.victoryModalOpen = false;
    },
    resetGame(state) {
      state.activeGrid = state.challengeGrid;
      state.remainingBlocks = state.actualRemainingBlocks;
      state.moves = 0;
      state.selectedBlock = null;
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
    startLoading(state) {
      state.loading = true;
    },
    toggleHideClues(state) {
      state.hideClues = !state.hideClues;
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

const newGameFromWorker = (): NewGameWorkerAction => {
  return {
    type: CREATE_NEW_GAME_IN_WORKER,
    worker: true,
    successActionType: gridSlice.actions.startNewGame.toString(),
  };
};
newGameFromWorker.toString = () => CREATE_NEW_GAME_IN_WORKER;
export { newGameFromWorker };

export const {
  actions: {
    startNewGame,
    selectBlock,
    fillBlock,
    resetGame,
    startLoading,
    setDifficulty,
    closeModal,
    toggleHideClues,
  },
  reducer: gridReducer,
} = gridSlice;
