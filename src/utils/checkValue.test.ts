import { isInGridColumn, isInGridRow, isInGridSquare } from './checkValue';
import { Grid } from 'types';
import 'core-js';

const buildGrid = () =>
  Array(9)
    .fill(0)
    .map(item => Array(9).fill(0));

const getRandomIndex = () => Math.floor(Math.random() * 9);

describe('isNumberInGridRow', () => {
  it('Should return true if number is in the row', () => {
    const grid = buildGrid() as Grid;
    const value = 2;
    const row = Math.floor(Math.random() * 9);
    grid[row][0] = value;
    expect(isInGridRow({ grid, row, value })).toBeTruthy();
  });

  it('Should return false if number is not in the row', () => {
    const grid = buildGrid() as Grid;
    const value = 2;
    const row = getRandomIndex();
    grid[row][0] = value;
    const invalidValue = 3;
    expect(isInGridRow({ grid, row, value: invalidValue })).toBeFalsy();
  });
});

describe('isNumberInGridColumn', () => {
  it('Should return true if number is in the column', () => {
    const grid = buildGrid() as Grid;
    const value = 2;
    const col = getRandomIndex();
    grid[0][col] = value;
    expect(isInGridColumn({ grid, col, value })).toBeTruthy();
  });

  it('Should return false if number is not in the column', () => {
    const grid = buildGrid() as Grid;
    const value = 2;
    const col = getRandomIndex();
    grid[0][col] = value;
    const invalidValue = 3;
    expect(isInGridColumn({ grid, col, value: invalidValue })).toBeFalsy();
  });
});

describe('isNumberInGridSquare', () => {
  it('Should return true if number is in the square', () => {
    const grid = buildGrid() as Grid;
    const value = 2;
    const row = getRandomIndex();
    const col = getRandomIndex();
    grid[row][col] = value;
    expect(isInGridSquare({ grid, col, row, value })).toBeTruthy();
  });

  it('Should return false if number is not in the column', () => {
    const grid = buildGrid() as Grid;
    const value = 2;
    const row = getRandomIndex();
    const col = getRandomIndex();
    grid[row][col] = value;
    const invalidValue = 3;
    expect(isInGridSquare({ grid, row, col, value: invalidValue })).toBeFalsy();
  });
});
