import styled from 'styled-components';

export const Button  = styled.button`
    outline: none;
    display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  outline: none;
  margin-right: 1.5rem;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.colorWhite};
  color: ${({ theme }) => theme.colors.colorPrimary};
  padding: 1.5rem;
  font-size: 3rem;
  border: ${({ theme }) => `1px solid ${theme.colors.colorBlue}`};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.transition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.colorBlueLight};
  }

  &::before {
    content: '';
    padding-bottom: 100%;
    display: block;
  }
`