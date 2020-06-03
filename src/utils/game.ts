import { createFullGrid, removeNumbersFromGrid, copyGrid } from 'utils';
import { REMOVE_NUMBERS_COUNT, EMPTY_VALUE } from '../constants';
import { Grid, Block, FilledBlock } from 'types';

export const createNewGame = () => {
  const solvedGrid = createFullGrid();
  const challengeGrid = removeNumbersFromGrid(solvedGrid, REMOVE_NUMBERS_COUNT);
  const activeGrid = copyGrid(challengeGrid);
  const remainingBlocks = REMOVE_NUMBERS_COUNT;
  return {
    challengeGrid,
    solvedGrid,
    activeGrid,
    remainingBlocks,
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
