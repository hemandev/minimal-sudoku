import { Grid, Numbers } from 'types';
import { identifyWorkingSquare } from 'utils';

interface IsNumberInGrid {
  grid: Grid;
  value: Numbers;
}

interface NumberInGridRow extends IsNumberInGrid {
  row: number;
}

interface NumberInGridCol extends IsNumberInGrid {
  col: number;
}

interface NumberInGridSquare
  extends IsNumberInGrid,
    NumberInGridRow,
    NumberInGridCol {}

/**
 * Check if value is in the grid row
 * @param param0
 */
export const isInGridRow = ({ grid, row, value }: NumberInGridRow): boolean =>
  grid[row].includes(value);

/**
 * Check if value is in the grid column
 * @param param0
 */
export const isInGridColumn = ({
  grid,
  col,
  value,
}: NumberInGridCol): boolean => {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i][col] === value) {
      return true;
    }
  }
  return false;
};

/**
 * Check if value is in the current grid square
 * @param param0
 */
export const isInGridSquare = ({
  grid,
  row,
  col,
  value,
}: NumberInGridSquare): boolean => {
  const workingSquare = identifyWorkingSquare({ grid, col, row });
  return workingSquare.flat(1).includes(value);
};

export const isValidInsert = (args: NumberInGridSquare) => {
  return !isInGridRow(args) && !isInGridColumn(args) && !isInGridSquare(args);
};
