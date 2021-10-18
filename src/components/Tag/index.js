import React from "react";

import { Container, Text } from "./styles/tag";

function Tag({ children }) {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
}

export default Tag;
