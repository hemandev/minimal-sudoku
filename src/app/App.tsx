import React from 'react';

import { Title, Layout, Paragraph } from 'components/styled';
import { Game } from 'components/game';

export const App = () => {
  return (
    <Layout>
      <Title>Minimal Sudoku</Title>
      <Game />
      <Paragraph>Use arrow keys or mouse to play</Paragraph>
    </Layout>
  );
};
