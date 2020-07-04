import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Modal from 'react-modal';

import { SudokuGrid } from 'components/sudokuGrid';
import { NumberGroup } from 'components/numberGroup';
import { Difficulty } from 'components/difficulty';
import { ConfigurationGroup } from 'components/configGroup';
import { DarkToggleButton } from 'components/styled';
import { Button } from 'components/styled';
import { Paragraph } from 'components/styled';
import { ReactComponent as MoonIcon } from 'assets/icons/moon.svg';
import { ReactComponent as SunIcon } from 'assets/icons/sun.svg';
import {
  fillBlock,
  selectBlock,
  startNewGame,
  resetGame,
  closeModal,
  setDifficulty,
} from 'slices/gridSlice';
import { setTheme } from 'slices/userPrefSlice';
import { Block, FilledBlock, Status, difficultyLevel, UserTheme } from 'types';
import { RootState } from 'app/rootReducer';
import {
  isUserFillableBlock,
  isCorrectValue,
  isBlockEmpty,
  isNeighbor,
} from 'utils';

Modal.setAppElement('#root');

const GameContainer = styled.main``;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
`;
const ModalButton = styled(Button)`
  font-size: 2.5rem;
  text-transform: uppercase;
  margin-top: 1.5rem;
  padding: 1.5rem;
`;

const ModalCloseButton = styled(Button)`
  border: none;
  padding: 1rem;
  font-size: 4.5rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const ModalParagraph = styled(Paragraph)`
  font-weight: 400;
  font-size: 3rem;
`;

interface IGameProps {
  theme: UserTheme;
}

export type INumberSelected = (value: string) => void;
export type IGetStatus = (block: FilledBlock) => Status;
export type ISelectBlock = (block: Block) => ReturnType<typeof selectBlock>;
export type IStartNewGame = () => ReturnType<typeof startNewGame>;
export type IResetGame = () => ReturnType<typeof resetGame>;
export type ISetDifficulty = (
  level: difficultyLevel
) => ReturnType<typeof setDifficulty>;

export const Game: FC<IGameProps> = ({ theme }) => {
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
  const currentDifficulty = useSelector(
    (state: RootState) => state.gridReducer.difficulty
  );

  const modalOpened = useSelector(
    (state: RootState) => state.gridReducer.victoryModalOpen
  );

  const totalMoves = useSelector((state: RootState) => state.gridReducer.moves);

  const selectBlockAction = useCallback(
    (block: Block) => dispatch(selectBlock(block)),
    [dispatch]
  );

  const setThemeAction = (mode: UserTheme) =>
    mode === 'light' ? dispatch(setTheme('dark')) : dispatch(setTheme('light'));

  const newGameAction = useCallback(() => dispatch(startNewGame()), [dispatch]);

  const resetGameAction = useCallback(() => dispatch(resetGame()), [dispatch]);

  const closeModalAction = useCallback(() => dispatch(closeModal()), [
    dispatch,
  ]);

  const setDifficultyAction = useCallback(
    (difficulty: difficultyLevel) => dispatch(setDifficulty(difficulty)),
    [dispatch]
  );

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

  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      padding: '0',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-30%',
      height: '60%',
      width: '80%',
      borderRadius: '0',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <GameContainer>
      <DarkToggleButton mode={theme} onClick={() => setThemeAction(theme)}>
        <SunIcon />
        <MoonIcon />
      </DarkToggleButton>
      <ConfigurationGroup
        startNewGame={newGameAction}
        resetGame={resetGameAction}
      />
      <Difficulty
        currentLevel={currentDifficulty}
        setDifficulty={setDifficultyAction}
      />
      <SudokuGrid
        selectedBlock={selectedBlock}
        grid={grid}
        getStatus={getStatus}
        selectBlock={selectBlockAction}
        onNumberSelected={onNumberSelected}
      />
      <NumberGroup onNumberSelected={onNumberSelected} />
      <Modal
        isOpen={modalOpened}
        onRequestClose={closeModalAction}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={customModalStyles}
        contentLabel="You won"
      >
        <ModalContainer>
          <ModalCloseButton onClick={closeModalAction}>
            &times;
          </ModalCloseButton>
          <ModalParagraph>You won!</ModalParagraph>
          <ModalParagraph>Total Moves: {totalMoves}</ModalParagraph>
          <ModalButton onClick={newGameAction}>Play Again</ModalButton>
        </ModalContainer>
      </Modal>
    </GameContainer>
  );
};
