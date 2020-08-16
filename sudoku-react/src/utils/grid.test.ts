import 'core-js';

import { Grid } from 'types';
import { fillGrid, createFullGrid, removeNumbersFromGrid, copyGrid } from './grid';
import { EMPTY_VALUE } from '../constants';

const buildGrid = (fillValue: number) =>
  Array(9)
    .fill(fillValue)
    .map(item => Array(9).fill(fillValue));


describe('fillGrid', () => {
  it('fills an empty grid', () => {
    const grid: Grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    fillGrid(grid);
    grid.flat(1).forEach(value => {
      expect(value).toBeGreaterThan(0);
      expect(value).toBeLessThan(10);
    });
  });

  it('fills a partially filled valid grid', () => {
    const grid: Grid = [
      [0, 4, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 3, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 6],
      [0, 5, 0, 0, 0, 0, 0, 0, 0],
    ];

    fillGrid(grid);
    grid.flat(1).forEach(value => {
      expect(value).toBeGreaterThan(0);
      expect(value).toBeLessThan(10);
    });
  });
});


describe('createFullGrid', () => {
  it('creates and returns a grid with filed values', () => {
 
    const grid = createFullGrid();
    grid.flat(1).forEach(value => {
      expect(value).toBeGreaterThan(0);
      expect(value).toBeLessThan(10);
    });
  });
});

describe('removeNumbersFromGrid', () => {
  it('removes numbers from a completely filled grid', () => {
    const testGrid = buildGrid(6) as Grid;
    const {grid, removedBlocks} = removeNumbersFromGrid(testGrid, 5);
    const zeroesList = grid.flat(1).filter(num => num === EMPTY_VALUE);
    expect(zeroesList).toHaveLength(removedBlocks);
  });

});

describe('copyGrid', () => {
  it('copies the given grid without mutating current grid', () => {
    const grid = buildGrid(6) as Grid;
    const copiedGrid = copyGrid(grid);
    copiedGrid[0][0] = 2;
    expect(copiedGrid === grid).toBeFalsy();
    expect(copiedGrid[0] === grid[0]).toBeFalsy()
    expect(copiedGrid[0][0] === grid[0][0]).toBeFalsy()
  });

});
