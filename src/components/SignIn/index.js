import React from "react";
import Input from "../Input";
import Button from "../Button";
import { BsGoogle } from "react-icons/bs";
import {
  Container,
  InputContainer,
  ButtonContainer,
  Title,
  SubTitle,
} from "./styles/signin";
import { IconContext } from "react-icons";

// import { Container } from './styles';

function SignIn() {
  return (
    <Container>
      <InputContainer>
        <Title>Já possuo uma conta</Title>
        <SubTitle>Entre com seu Email e Senha</SubTitle>
        <Input />
        <Input />
        <ButtonContainer>
          <Button>LOGIN</Button>
          <Button>
            <IconContext.Provider value={{ style: { fontSize: 25 } }}>
              <BsGoogle />
            </IconContext.Provider>{" "}
            {"   "} LOGIN COM GOOGLE
          </Button>
        </ButtonContainer>
      </InputContainer>
    </Container>
  );
}

export default SignIn;
