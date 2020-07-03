import styled from 'styled-components';

import { GridItemProps, Status } from 'types';
import { theme } from '../../../styles';

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
  border: none;
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
