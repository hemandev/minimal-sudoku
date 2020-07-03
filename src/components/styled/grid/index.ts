import styled from 'styled-components';

const Container = styled.div`
  background: black;
  display: inline-block;
  border: 3px solid black;
  padding-right: 2px;
  padding-bottom: 2px;
`;

const SubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 15rem);
  grid-template-rows: repeat(3, 15rem);
  grid-gap: 5px;
`;

const SubGridItem = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 5rem);
  grid-template-rows: repeat(3, 5rem);
  grid-gap: 1px;
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

