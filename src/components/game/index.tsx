import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { SudokuGrid } from 'components/sudokuGrid';
import { NumberGroup } from 'components/numberGroup';
import { ConfigurationGroup } from 'components/configGroup';
import { fillBlock, selectBlock, startNewGame, resetGame } from 'slices/gridSlice';
import { Block, FilledBlock, Status } from 'types';
import { RootState } from 'app/rootReducer';
import {
  isUserFillableBlock,
  isCorrectValue,
  isBlockEmpty,
  isNeighbor,
} from 'utils';

const GameContainer = styled.main``;

export type INumberSelected = (value: string) => void;
export type IGetStatus = (block: FilledBlock) => Status;
export type ISelectBlock = (block: Block) => ReturnType<typeof selectBlock>;
export type IStartNewGame = () => ReturnType<typeof startNewGame>;
export type IResetGame = () => ReturnType<typeof resetGame>;

export const Game: FC = () => {
  const dispatch = useDispatch();

  const grid = useSelector((state: RootState) => state.gridReducer.activeGrid);

  const solvedGrid = useSelector(
    (state: RootState) => state.gridReducer.solvedGrid
  );
  const challengeGrid = useSelector(
    (state: RootState) => state.gridReducer.challengeGrid
  );
  const selectedBlock = useSelector(
    (state: RootState) => state.gridReducer.selectedBlock
  );

  const selectBlockAction = useCallback(
    (block: Block) => dispatch(selectBlock(block)),
    [dispatch]
  );

  const newGameAction = useCallback(() => dispatch(startNewGame()), [dispatch]);

  const resetGameAction = useCallback(() => dispatch(resetGame()), [dispatch]);

  const getStatus = useCallback(
    (block: FilledBlock): Status => {
      if (isUserFillableBlock(block, challengeGrid)) {
        if (isCorrectValue(block, solvedGrid) && !isBlockEmpty(block.value)) {
          return 'correct';
        }

        if (!isCorrectValue(block, solvedGrid) && !isBlockEmpty(block.value)) {
          return 'incorrect';
        }
      }

      if (selectedBlock && isNeighbor(selectedBlock, block)) {
        return 'highlight';
      }

      if (
        selectedBlock &&
        selectedBlock.row === block.row &&
        selectedBlock.col === block.col
      ) {
        return 'active';
      }

      return 'normal';
    },
    [challengeGrid, solvedGrid, selectedBlock]
  );

  const onNumberSelected = useCallback(
    (value: string) => {
      if (selectedBlock && isUserFillableBlock(selectedBlock, challengeGrid)) {
        dispatch(
          fillBlock({
            row: selectedBlock.row,
            col: selectedBlock.col,
            value: parseInt(value),
          })
        );
      }
    },
    [dispatch, selectedBlock, challengeGrid]
  );

  return (
    <GameContainer>
      <ConfigurationGroup startNewGame={newGameAction} resetGame={resetGameAction}/>
      <SudokuGrid
        selectedBlock={selectedBlock}
        grid={grid}
        getStatus={getStatus}
        selectBlock={selectBlockAction}
        onNumberSelected={onNumberSelected}
      />
      <NumberGroup onNumberSelected={onNumberSelected} />
    </GameContainer>
  );
};
