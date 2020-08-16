import 'core-js';
import { createNewGame } from './game';
import { fillGrid, copyGrid } from './grid';

describe('createNewGame', () => {
  it('creates a new game with a suodku puzzle with unique solution', () => {
    const testGrid = createNewGame('easy');
    const gridCopy = copyGrid(testGrid.challengeGrid);
    fillGrid(gridCopy);
    const solGridFlat = testGrid.solvedGrid.flat(1);
    const resultGridFlat = gridCopy.flat(1);
    const result = resultGridFlat.every((val, index) => val === solGridFlat[index]);
    expect(result).toBeTruthy();
  });
});
