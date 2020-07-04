import React, { FC } from 'react';
import styled from 'styled-components';

import { Button as StyledButton } from 'components/styled/button';
import { IStartNewGame, IResetGame } from 'components/game';

interface IConfigurationContainer {
  startNewGame: IStartNewGame;
  resetGame: IResetGame;
}

const ConfigurationContainer = styled.div`
  display: flex;
  margin: 2.5rem;
  justify-content: center;
`;

const Button = styled(StyledButton)`
  padding: 1rem 2.5rem;
  font-size: 2rem;
  text-transform: uppercase;
`;

export const ConfigurationGroup: FC<IConfigurationContainer> = ({
  startNewGame,
  resetGame,
}) => {
  return (
    <ConfigurationContainer>
      <Button onClick={startNewGame}>New</Button>
      <Button onClick={resetGame}>Reset</Button>
    </ConfigurationContainer>
  );
};
