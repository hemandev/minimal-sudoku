import { Grid } from 'types';
import { EMPTY_VALUE } from '../constants';

/**
 * Check if the grid is completely filled
 * @param grid
 */
export const isGridFull = (grid: Grid) => {
  return !grid.flat(1).includes(EMPTY_VALUE);
};
