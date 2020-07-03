import React, { FC, Children } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import { Button as StyledButton } from 'components/styled/button';
import { ISetDifficulty } from '../game';
import { difficultyLevel } from 'types';
import { difficultyLevels } from '../../constants';
import { device } from 'styles';

interface IDifficultyContainer {
  currentLevel: difficultyLevel;
  setDifficulty: ISetDifficulty;
}

interface IDifficultyButton {
  active: boolean;
}

const DifficultyContainer = styled.div`
  display: flex;
  margin: 3.5rem;
  justify-content: center;

  @media ${device.mobileL} {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(StyledButton)<IDifficultyButton>`
  padding: 0.5rem 1.5rem;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  border-bottom: ${({ theme, active }) =>
    active ? `2px solid ${theme.colors.colorGreen}` : '2px solid white'};
  &:hover {
    background-color: ${({ theme }) => rgba(theme.colors.colorGreenLight, .2)};
  }

  @media ${device.mobileL} {
    margin-bottom: .5rem;
  }
`;

export const Difficulty: FC<IDifficultyContainer> = ({
  currentLevel,
  setDifficulty,
}) => {
  return (
    <DifficultyContainer>
      {Children.toArray(
        difficultyLevels.map(level => (
          <Button
            active={level === currentLevel}
            onClick={() => setDifficulty(level)}
          >
            {level.toUpperCase()}
          </Button>
        ))
      )}
    </DifficultyContainer>
  );
};
