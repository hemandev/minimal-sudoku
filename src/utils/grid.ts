import { Grid, Numbers } from 'types';
import { GRID_SIZE, EMPTY_VALUE } from '../constants';
import {
  shuffle,
  randomNumberGenerator,
  isInGridColumn,
  isInGridRow,
  isInGridSquare,
  isGridFull,
} from 'utils';

const numbers: Numbers[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
    row = Math.floor(i / GRID_SIZE);
    col = i % GRID_SIZE;

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
 * Removes n number of values from the specified grid
 * @param {Grid} grid
 * @param {number} n
 */
export const removeNumbersFromGrid = (grid: Grid, n: number) => {
  const gridCopy = copyGrid(grid);

  while (n > 0) {
    const rng = randomNumberGenerator(GRID_SIZE * GRID_SIZE);
    const row = Math.floor(rng / GRID_SIZE);
    const col = Math.floor(rng % GRID_SIZE);
    if (gridCopy[row][col] !== EMPTY_VALUE) {
      n--;
      gridCopy[row][col] = EMPTY_VALUE;
    }
  }
  return gridCopy;
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
