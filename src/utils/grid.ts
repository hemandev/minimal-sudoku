import { Grid, Numbers } from 'types';
import { GRID_SIZE, EMPTY_VALUE } from '../constants';
import {
  shuffle,
  randomNumberGenerator,
  isInGridColumn,
  isInGridRow,
  isInGridSquare,
  isGridFull,
  solveGrid,
} from 'utils';
import { global } from 'global';

const numbers: Numbers[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const getRowIndex = (index: number, gridSize: number) =>
  Math.floor(index / gridSize);

export const getColIndex = (index: number, gridSize: number) =>
  index % gridSize;

/**
 * Creates and returns and empty grid
 * @returns {Grid} returns newly created grid
 */
export const buildEmptyGrid = (): Grid =>
  Array(GRID_SIZE)
    .fill(EMPTY_VALUE)
    .map(() => Array(GRID_SIZE).fill(EMPTY_VALUE)) as Grid;

/**
 * A backtracking / recursive function to check all possible combinations
 * of numbers till a solution is found.
 * @param {Grid} grid
 */
export const fillGrid = (grid: Grid) => {
  let row = 0;
  let col = 0;
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    row = getRowIndex(i, GRID_SIZE);
    col = getColIndex(i, GRID_SIZE);

    if (grid[row][col] === EMPTY_VALUE) {
      const shuffledNumbers = shuffle<Numbers>(numbers);
      for (let value of shuffledNumbers) {
        const args = { grid, row, col, value };
        const isAlreadyFilled =
          isInGridRow(args) || isInGridColumn(args) || isInGridSquare(args);
        if (!isAlreadyFilled) {
          grid[row][col] = value;
          if (isGridFull(grid)) {
            return true;
          } else if (fillGrid(grid)) {
            return true;
          }
        }
      }
      break;
    }
  }
  grid[row][col] = EMPTY_VALUE;
};

/**
 * Removes numbers from a full grid to create a Sudoku Puzzle.
 * @param {Grid} completeGrid
 * @param {number} attempts - number of attempts to solve (higher means more difficult) - default 5
 */
export const removeNumbersFromGrid = (
  completeGrid: Grid,
  attempts: number = 5
) => {
  const grid = copyGrid(completeGrid);
  let removedBlocks = 0;

  while (attempts > 0) {
    let row = randomNumberGenerator(GRID_SIZE);
    let col = randomNumberGenerator(GRID_SIZE);

    while (grid[row][col] === 0) {
      row = randomNumberGenerator(GRID_SIZE);
      col = randomNumberGenerator(GRID_SIZE);
    }

    const backup = grid[row][col];
    grid[row][col] = 0;

    const gridCopy = copyGrid(grid);

    global.counter = 0;
    solveGrid(gridCopy);

    if (global.counter !== 1) {
      grid[row][col] = backup;
      attempts--;
    } else {
      removedBlocks++;
    }
  }

  return { grid, removedBlocks };
};

/**
 * Creates an empty grid and fills it with values
 * @return {Grid}
 */
export const createFullGrid = () => {
  const grid = buildEmptyGrid();
  fillGrid(grid);
  return grid;
};

/**
 * Copies the current grid and returns a new Grid
 * @param {Grid} grid
 * @return {Grid}
 */
export const copyGrid = (grid: Grid) => {
  return grid.map(row => [...row]) as Grid;
};
