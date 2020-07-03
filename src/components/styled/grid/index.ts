import styled from 'styled-components';

import { GridProps } from 'types';

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${({ gridSize }) => `repeat(${gridSize}, 5rem)`};
  grid-template-rows: ${({ gridSize }) => `repeat(${gridSize}, 5rem)`};
  justify-content: center;
`;
