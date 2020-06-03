import styled from 'styled-components';

import { GridItemProps, Status } from 'types';
import { theme } from '../../../styles';
import { GRID_SIZE } from '../../../constants';

const borderThick = '3px solid #222831;';
const borderMedium = '2px solid #222831;';
const borderThin = '1px solid #222831;';

const getBorderSize = (index: number) => {
  if (index === GRID_SIZE - 1) {
    return borderThick;
  } else if ((index + 1) % 3 === 0) {
    return borderMedium;
  }
  return 'none';
};

const getBgColor = (status: Status) => {
  const bgColors = {
    active: theme.colors.colorBlueLight,
    correct: theme.colors.colorGreenLight,
    incorrect: theme.colors.colorRedLight,
    normal: theme.colors.colorWhite,
    highlight: theme.colors.colorGreyLight,
  };

  return bgColors[status];
};

const getColor = (status: Status) => {
  const colors = {
    active: theme.colors.colorPrimary,
    correct: theme.colors.colorGreen,
    incorrect: theme.colors.colorRed,
    normal: theme.colors.colorPrimary,
    highlight: theme.colors.colorPrimary,
  };

  return colors[status];
};

export const GridItem = styled.button<GridItemProps>`
  grid-area: ${({ row, col }) =>
    `${row + 1} / ${col + 1} / ${row + 2} / ${col + 2}`};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  outline: none;
  user-select: none;
  background-color: ${({ status }) => getBgColor(status)};
  color: ${({ status }) => getColor(status)};
  padding: 1rem;
  font-size: 3rem;
  cursor: pointer;
  border-top: ${({ row }) => (row === 0 ? borderThick : borderThin)};
  border-left: ${({ col }) => (col === 0 ? borderThick : borderThin)};
  border-right: ${({ col }) => getBorderSize(col)};
  border-bottom: ${({ row }) => getBorderSize(row)};
  transition: ${({ theme }) => theme.transition.transition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.colorBlueLight};
  }

  &::before {
    content: '';
    padding-bottom: 100%;
    display: block;
  }
`;
