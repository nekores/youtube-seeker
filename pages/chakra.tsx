import type * as CSS from "csstype";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";

export default function Foo() {
  const boxStyles = {
    padding: "10px",
    backgroundColor: "purple",
    color: "white",
    textAlign: "center",
    ":hover": {
      backgroundColor: "Yellow",
      color: "black",
    },
  };
  return (
    <>
      <Flex p="10px" bg="grey.100" justify="space-around" wrap="wrap" gap="2">
        <Box bg="green" w="200px"> 1</Box>
        <Box bg="red" w="200px"> 2</Box>
        <Box bg="blue" w="200px"> 3</Box>

      </Flex>
      <Container>
        <Heading> Hello!</Heading>
        <Text> Foo </Text>
        <Box sx={boxStyles}> Hello Chakra</Box>
      </Container>
    </>
  );
}
