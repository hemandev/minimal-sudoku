import styled from 'styled-components';

import { device } from 'styles';

const Container = styled.div`
  background: black;
  display: inline-block;
  border: 2px solid black;
  padding-right: 2px;
  padding-bottom: 2px;
`;

const SubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 15rem);
  grid-template-rows: repeat(3, 15rem);
  grid-gap: 5px;

  @media ${device.mobileL} {
    grid-template-columns: repeat(3, 12rem);
    grid-template-rows: repeat(3, 12rem);
    grid-gap: 4px;
  }
`;

const SubGridItem = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 5rem);
  grid-template-rows: repeat(3, 5rem);
  grid-gap: 1px;

  @media ${device.mobileL} {
    grid-template-columns: repeat(3, 4rem);
    grid-template-rows: repeat(3, 4rem);
    grid-gap: 1px;
  }
`;

interface IGrid {
  Container: typeof Container;
  SubGrid: typeof SubGrid;
  SubGridItem: typeof SubGridItem;
}

export const Grid: IGrid = {
  Container,
  SubGrid,
  SubGridItem,
};
