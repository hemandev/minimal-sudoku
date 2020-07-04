import { createFullGrid, removeNumbersFromGrid, copyGrid } from 'utils';
import {
  REMOVE_NUMBERS_COUNT_EASY,
  REMOVE_NUMBERS_COUNT_MEDIUM,
  REMOVE_NUMBERS_COUNT_HARD,
  REMOVE_NUMBERS_COUNT_EXPERT,
  EMPTY_VALUE,
} from '../constants';
import { Grid, Block, FilledBlock, difficultyLevel } from 'types';

export const createNewGame = (level: difficultyLevel = 'easy') => {
  const removeNumbers = {
    easy: REMOVE_NUMBERS_COUNT_EASY,
    medium: REMOVE_NUMBERS_COUNT_MEDIUM,
    hard: REMOVE_NUMBERS_COUNT_HARD,
    expert: REMOVE_NUMBERS_COUNT_EXPERT,
  };
  const solvedGrid = createFullGrid();
  const challengeGrid = removeNumbersFromGrid(solvedGrid, removeNumbers[level]);
  const activeGrid = copyGrid(challengeGrid);
  const remainingBlocks = removeNumbers[level];
  return {
    challengeGrid,
    solvedGrid,
    activeGrid,
    remainingBlocks,
    actualRemainingBlocks: remainingBlocks
  };
};

export const isUserFillableBlock = (
  { row, col }: Block,
  challengeGrid: Grid
) => {
  return challengeGrid[row][col] === EMPTY_VALUE;
};

export const isCorrectValue = (
  { row, col, value }: FilledBlock,
  solvedGrid: Grid
) => {
  return value === solvedGrid[row][col];
};

export const isBlockEmpty = (value: number) => {
  return value === EMPTY_VALUE;
};

const isInSameRow = (selectedBlock: Block, block: Block) => {
  return selectedBlock.row === block.row;
};

const isInSameCol = (selectedBlock: Block, block: Block) => {
  return selectedBlock.col === block.col;
};

const isInSameSquare = (selectedBlock: Block, block: Block) => {
  const colLowerLimit =
    selectedBlock.col < 3 ? 0 : selectedBlock.col < 6 ? 3 : 6;
  const colUpperLimit = colLowerLimit + 3;
  const rowLowerLimit =
    selectedBlock.row < 3 ? 0 : selectedBlock.row < 6 ? 3 : 6;
  const rowUpperLimit = rowLowerLimit + 3;
  return (
    block.row >= rowLowerLimit &&
    block.row < rowUpperLimit &&
    block.col >= colLowerLimit &&
    block.col < colUpperLimit
  );
};

export const isNeighbor = (selectedBlock: Block, block: Block) => {
  return (
    !(selectedBlock.row === block.row && selectedBlock.col === block.col) &&
    (isInSameCol(selectedBlock, block) ||
      isInSameRow(selectedBlock, block) ||
      isInSameSquare(selectedBlock, block))
  );
};
