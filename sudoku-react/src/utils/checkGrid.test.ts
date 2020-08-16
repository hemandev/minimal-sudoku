import 'core-js';

import { isGridFull } from './checkGrid';
import { Grid } from 'types';

const buildGrid = (fillValue: number) =>
  Array(9)
    .fill(fillValue)
    .map(item => Array(9).fill(fillValue));

describe('isGridFull', () => {
  it('Should return true when the grid is completely filled', () => {
    const grid1 = buildGrid(2) as Grid;
    const grid2 = buildGrid(5) as Grid;
    expect(isGridFull(grid1)).toBeTruthy();
    expect(isGridFull(grid2)).toBeTruthy();
  });

  it('Should return false when the grid is not completely filled', () => {
    const grid1: Grid = [
      [0, 2, 3, 1, 8, 2, 6, 1, 4],
      [3, 1, 0, 2, 4, 0, 0, 0, 0],
      [6, 4, 7, 6, 0, 0, 6, 0, 0],
      [0, 5, 8, 0, 5, 9, 1, 2, 6],
      [0, 2, 3, 1, 8, 2, 6, 1, 4],
      [0, 9, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 2, 7, 0, 2, 3, 6, 9],
      [0, 5, 8, 0, 5, 9, 1, 2, 6],
      [0, 3, 0, 0, 0, 0, 0, 0, 0],
    ];

    const grid2 = buildGrid(0) as Grid;

    expect(isGridFull(grid1)).toBeFalsy();
    expect(isGridFull(grid2)).toBeFalsy();
  });
});
