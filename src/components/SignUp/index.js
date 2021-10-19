import React from "react";
import Input from "../Input";
import Button from "../Button";

import { Container, InputContainer } from "./styles/signup";

function SignUp() {
  return (
    <Container>
      <InputContainer>
        <Input />
        <Input />
        <Input />
        <Input />
        <Button>REGISTRAR</Button>
      </InputContainer>
    </Container>
  );
}

export default SignUp;
