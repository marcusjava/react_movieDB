import React from "react";
import { Label, Input } from "./styles/input";

// import { Container } from './styles';

function CustomInput({ label = false }) {
  return (
    <>
      {label && <Label>Email</Label>}
      <Input placeholder="Enter your email address" />
    </>
  );
}

export default CustomInput;
