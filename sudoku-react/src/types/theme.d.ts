import 'styled-components';
import { lightTheme } from '../styles';

export type Theme = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
