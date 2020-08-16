import { globals } from 'global';
import { Grid, Numbers } from 'types';
import { isValidInsert, getEmptyIndex } from 'utils';
import { EMPTY_VALUE } from '../constants';

/**
 * A backtracking/recursive function to check all possible combinations of numbers until a solution is found
 * @param grid A 9X9 array consisting of values from 0-9)
 */
export const solveGrid = (grid: Grid) => {
  const emptyIndex = getEmptyIndex(grid);
  if (!emptyIndex) {
    globals.counter++;
    return false;
  }

  let [row, col] = emptyIndex;
  for (let value = 1 as Numbers; value <= 9 && globals.counter < 2; value++) {
    const args = { grid, row, col, value };  
    if (isValidInsert(args)) {
      grid[row][col] = value;
      if (solveGrid(grid)) {
        return true;
      }
      grid[row][col] = EMPTY_VALUE;
    }
  }
  return false;
};


export default solveGrid;
