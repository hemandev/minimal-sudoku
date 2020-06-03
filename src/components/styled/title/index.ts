import styled, { css } from 'styled-components';

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.colorPrimary};
    text-align: center;
    margin-top: 0;
    text-transform: uppercase;
    font-size: 5rem;
    letter-spacing: 3px;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  `}
`;
