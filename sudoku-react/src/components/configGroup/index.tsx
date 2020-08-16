import React, { FC } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import { Button as StyledButton } from 'components/styled/button';
import { IStartNewGame, IResetGame, IToggleHideClues } from 'components/game';
import { device } from 'styles';

interface IConfigurationContainer {
  startNewGame: IStartNewGame;
  resetGame: IResetGame;
  toggleHideClues: IToggleHideClues;
}

const ConfigurationContainer = styled.div`
  display: flex;
  margin: 2.5rem;
  justify-content: center;

  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

const Button = styled(StyledButton)`
  padding: 1rem 2.5rem;
  font-size: 2rem;
  text-transform: uppercase;
  @media ${device.mobileL} {
    margin-bottom: 1.5rem;
  }
`;

export const ConfigurationGroup: FC<IConfigurationContainer> = ({
  startNewGame,
  resetGame,
  toggleHideClues,
}) => {
  const startNewGameDebounced = debounce(startNewGame, 300);

  return (
    <ConfigurationContainer>
      <Button onClick={startNewGameDebounced}>New</Button>
      <Button onClick={resetGame}>Reset</Button>
      <Button onClick={toggleHideClues}>Toggle Clues</Button>
    </ConfigurationContainer>
  );
};
