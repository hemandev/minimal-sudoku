import styled from 'styled-components';

import { Button } from '../button';
import { UserTheme } from 'types';
import { device } from 'styles';

interface IToggleProps {
  mode: UserTheme;
}

export const DarkToggleButton = styled(Button)<IToggleProps>`
  position: fixed;
  top: 1rem;
  right: 1rem;
  border: none;
  background-color: transparent;
  &:hover {
    background-color: transparent;
  }

  svg {
    height: auto;
    position: absolute;
    top: 0;
    right: 0;
    width: 4.5rem;
    transition: all 0.2s linear;

    @media ${device.mobileL} {
      width: 3.5rem;
  }

  @media ${device.mobileM} {
      width: 3rem;
  }
    
    // sun 
    &:first-child {
      transform: ${({ mode }) => mode === 'dark' && `translateX(30rem)`};
    }
    
    // moon 
    &:nth-child(2) {
      transform: ${({ mode }) => mode === 'light' && `translateX(30rem)`};
    }
`;
