import { Button, Flex, Heading } from "@chakra-ui/react";
import { useAuthStore } from "../../stores/auth";

export const Header = () => {
  const { signout } = useAuthStore();

  return (
    <Flex p={3} alignItems="center" justifyContent="space-around">
      <Heading size="md">Chat</Heading>
      <Button size="sm" colorScheme="whiteAlpha" onClick={signout}>
        Sair
      </Button>
    </Flex>
  );
};
