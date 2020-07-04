import { RootState } from '../app/rootReducer';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('sudokuState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as RootState;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('sudokuState', serializedState);
  } catch (err) {
    console.error('Error occurred while saving into local storage', err);
  }
};
