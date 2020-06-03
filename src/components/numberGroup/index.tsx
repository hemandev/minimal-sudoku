import React, { FC } from 'react';
import styled from 'styled-components';

import { INumberSelected } from 'components/game';
import { Button } from 'components/styled/button';
import { NUMBERS } from '../../constants';

interface INumberGroup {
  onNumberSelected: INumberSelected;
}

const StyledNumberGroup = styled.div`
  display: flex;
  margin-top: 2.5rem;
  height: 5rem;
  justify-content: center;
`;

const NumberButton = styled(Button)`
  flex-basis: 5rem;
  border: ${({ theme }) => `1px solid ${theme.colors.colorPrimary}`};
  //border-right: none;
  border-left: ${({ theme }) => `1px solid ${theme.colors.colorPrimary}`};

  &:last-child {
    border-right: ${({ theme }) => `1px solid ${theme.colors.colorPrimary}`};
  }
`;

export const NumberGroup: FC<INumberGroup> = ({ onNumberSelected }) => {
  return (
    <StyledNumberGroup>
      {React.Children.toArray(
        NUMBERS.map(number => (
          <NumberButton onClick={evt => onNumberSelected(number)}>
            {number}
          </NumberButton>
        ))
      )}
    </StyledNumberGroup>
  );
};
