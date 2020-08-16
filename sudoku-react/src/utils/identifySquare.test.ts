import { identifyWorkingSquare } from './identifySquare';

import { Grid } from 'types';

describe('identifyWorkingSquare', () => {
  it('Identifies the correct square for a given grid with row and col index', () => {
    const grid: Grid = [
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

    const square1 = [
      [0, 2, 3],
      [3, 1, 0],
      [6, 4, 7],
    ];

    const input1 = {
      grid,
      row: 2,
      col: 1,
    };

    const square2 = [
      [3, 6, 9],
      [1, 2, 6],
      [0, 0, 0],
    ];

    const input2 = {
      grid,
      row: 8,
      col: 8,
    };

    const square3 = [
      [0, 5, 9],
      [1, 8, 2],
      [0, 0, 0],
    ];

    const input3 = {
      grid,
      row: 4,
      col: 5,
    };

    expect(identifyWorkingSquare(input1)).toEqual(square1);
    expect(identifyWorkingSquare(input2)).toEqual(square2);
    expect(identifyWorkingSquare(input3)).toEqual(square3);
  });
});
