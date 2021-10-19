import React from "react";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

import { Container } from "./styles/signin-signup";

function SignInAndSignUp() {
  return (
    <Container>
      <SignIn />
      <SignUp />
    </Container>
  );
}

export default SignInAndSignUp;
