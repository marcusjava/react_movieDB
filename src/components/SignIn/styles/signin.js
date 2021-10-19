import styled from "styled-components/macro";

export const Container = styled.div`
  width: 40%;
  height: 600px;
  display: grid;
  place-items: center;
  border: 6px solid #fff;
  border-radius: 5px;
`;

export const InputContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

export const Title = styled.h2`
  font-weight: bold;
`;

export const SubTitle = styled.h4`
  font-weight: 100;
`;
