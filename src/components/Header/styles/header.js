import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  height: 100px;
  color: #fff;
  background-color: #032541;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
`;

export const ItemsContainer = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 50px;
`;

export const ItemLink = styled(Link)`
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;
