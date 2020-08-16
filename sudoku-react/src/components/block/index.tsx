import React, { FC, useCallback } from 'react';

import { GridItem } from 'components/styled';
import { ISelectBlock } from 'components/game';
import { GridItemProps } from 'types';

interface IBlock extends GridItemProps {
  selectBlock: ISelectBlock;
}

export const Block: FC<IBlock> = ({ row, col, value, status, selectBlock }) => {

  const handleClick = useCallback(() => {
    status !== 'active' &&
      selectBlock({
        row,
        col,
      });
  }, [status, row, col, selectBlock]);

  return (
    <GridItem
      onClick={handleClick}
      row={row}
      col={col}
      status={status}
      value={value}
    >
      {value === 0 ? '' : value}
    </GridItem>
  );
};
