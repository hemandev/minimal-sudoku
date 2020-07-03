import React, { FC } from 'react';
import styled from 'styled-components';

import { INumberSelected } from 'components/game';
import { Button } from 'components/styled/button';
import { NUMBERS } from '../../constants';

interface INumberGroup {
  onNumberSelected: INumberSelected;
}

const StyledNumberGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 5rem);
  grid-template-rows: 5rem;
  grid-gap: 3px;
  margin-top: 2.5rem;
  justify-content: center;
`;

const NumberButton = styled(Button)`
  border: ${({ theme }) => `1px solid ${theme.colors.colorPrimary}`};
  margin: 0;
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
