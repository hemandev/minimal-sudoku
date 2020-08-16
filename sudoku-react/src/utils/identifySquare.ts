import { Square, Grid } from 'types';

interface IdentifySquare {
  grid: Grid;
  row: number;
  col: number;
}

/**
 * Identifies the current working square of a 9x9 grid
 * @param identifySquare  
 */
export const identifyWorkingSquare = ({
  grid,
  col,
  row,
}: IdentifySquare): Square => {
  const square = [];
  const colLowerLimit = col < 3 ? 0 : col < 6 ? 3 : 6;
  const rowLowerLimit = row < 3 ? 0 : row < 6 ? 3 : 6;

  for (let r = rowLowerLimit, c = colLowerLimit; r < rowLowerLimit + 3; r++) {
    square.push(grid[r].slice(c, c + 3));
  }

  return square as Square;
};
