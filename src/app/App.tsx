import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { Title, Layout, Paragraph } from 'components/styled';
import { Game } from 'components/game';
import { GlobalStyles, lightTheme, darkTheme } from 'styles';
import { RootState } from './rootReducer';
import { UserTheme } from 'types';

export const App = () => {
  const userTheme = useSelector(
    (state: RootState) => state.userPrefReducer.theme
  );

  const getUserTheme = (mode: UserTheme) =>
    mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={getUserTheme(userTheme)}>
      <GlobalStyles />
      <Layout>
        <Title>Minimal Sudoku</Title>
        <Game theme={userTheme}/>
        <Paragraph>Use arrow keys or mouse to play</Paragraph>
      </Layout>
    </ThemeProvider>
  );
};
