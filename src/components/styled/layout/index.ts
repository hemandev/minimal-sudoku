import styled from 'styled-components';

export const Layout = styled.div`
  background-color: ${({ theme }) => theme.colors.colorWhite};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
