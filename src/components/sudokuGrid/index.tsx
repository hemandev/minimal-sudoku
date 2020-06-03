import React, { FC, Children } from 'react';
import useMouseTrap from 'react-hook-mousetrap';

import { Block } from 'components/block';
import { Grid } from 'components/styled';
import { Block as IBlock, Grid as IGrid } from 'types';
import { GRID_SIZE, NUMBERS } from '../../constants';
import { INumberSelected, IGetStatus, ISelectBlock } from 'components/game';

interface ISudokuGrid {
  onNumberSelected: INumberSelected;
  getStatus: IGetStatus;
  selectedBlock: IBlock | null;
  selectBlock: ISelectBlock;
  grid: IGrid;
}

export const SudokuGrid: FC<ISudokuGrid> = ({
  onNumberSelected,
  getStatus,
  grid,
  selectBlock,
  selectedBlock,
}) => {
  const moveDown = () => {
    if (selectedBlock && selectedBlock.row < GRID_SIZE - 1) {
      selectBlock({ row: selectedBlock.row + 1, col: selectedBlock.col });
    }
  };

  const moveLeft = () => {
    if (selectedBlock && selectedBlock.col > 0) {
      selectBlock({ row: selectedBlock.row, col: selectedBlock.col - 1 });
    }
  };

  const moveRight = () => {
    if (selectedBlock && selectedBlock.col < GRID_SIZE - 1) {
      selectBlock({ row: selectedBlock.row, col: selectedBlock.col + 1 });
    }
  };

  const moveUp = () => {
    if (selectedBlock && selectedBlock.row > 0) {
      selectBlock({ row: selectedBlock.row - 1, col: selectedBlock.col });
    }
  };

  useMouseTrap('up', moveUp);
  useMouseTrap('down', moveDown);
  useMouseTrap('left', moveLeft);
  useMouseTrap('right', moveRight);

  NUMBERS.forEach(number => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMouseTrap(number, () => {
      onNumberSelected(number);
    });
  });

  return (
    <Grid gridSize={GRID_SIZE} data-cy="grid">
      {Children.toArray(
        [...Array(GRID_SIZE)].map((_, row) =>
          [...Array(GRID_SIZE)].map((_, col) => {
            return (
              <Block
                data-cy="grid-item"
                row={row}
                col={col}
                status={getStatus({ row, col, value: grid[row][col] })}
                selectBlock={selectBlock}
                value={grid[row][col]}
              />
            );
          })
        )
      )}
    </Grid>
  );
};
