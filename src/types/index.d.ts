export type Numbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type N = 0 | Numbers;

export type Index = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Row = [N, N, N, N, N, N, N, N, N];

export type Grid = [Row, Row, Row, Row, Row, Row, Row, Row, Row];

export type SquareRow = [N, N, N];

export type Square = [SquareRow, SquareRow, SquareRow];

export type difficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface GridItemProps {
  row: number;
  col: number;
  status: Status;
  value: number;
}

export interface GridProps {
  gridSize: number;
}

export interface Block {
  row: number;
  col: number;
}

export type Status =
  | 'correct'
  | 'incorrect'
  | 'active'
  | 'normal'
  | 'highlight';

export interface FilledBlock extends Block {
  value: number;
}
