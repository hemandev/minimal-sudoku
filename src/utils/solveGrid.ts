import { global } from 'global';
import { Grid, Numbers } from 'types';
import { isGridFull, isInGridColumn, isInGridRow, isInGridSquare } from 'utils';
import { GRID_SIZE } from '../constants';

const numbers: Numbers[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * A backtracking/recursive function to check all possible combinations of numbers until a solution is found
 * @param grid A 9X9 array consisting of values from 0-9)
 */
export const solveGrid = function (grid: Grid) {
  let row = 0;
  let col = 0;

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    row = Math.floor(i / 9);
    col = i % 9;

    if (grid[row][col] === 0) {
      for (let value of numbers) {
        const args = { grid, row, col, value };
        const isAlreadyFilled =
          isInGridRow(args) || isInGridColumn(args) || isInGridSquare(args);
        if (!isAlreadyFilled) {
          grid[row][col] = value;
          if (isGridFull(grid)) {
            global.counter++;
            break;
          } else if (solveGrid(grid)) {
            return true;
          }
        }
      }
      break;
    }
  }

  grid[row][col] = 0;
};

export default solveGrid;
