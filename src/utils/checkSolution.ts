import { Grid } from 'types';

export const checkSolution = (userGrid: Grid, solutionGrid: Grid) => {
  const userList = userGrid.flat(1);
  const solutionList = solutionGrid.flat(1);
  console.log('user', userList);
  console.log('sol', solutionList)
  return solutionList.every((value, index) => value === userList[index]);
};
