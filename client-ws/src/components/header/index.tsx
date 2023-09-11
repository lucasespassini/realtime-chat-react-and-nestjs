import { Button, Flex, Heading } from "@chakra-ui/react";
import { useAuthStore } from "../../stores/auth";

export const Header = () => {
  const { payload, signout } = useAuthStore();

  return (
    <Flex p={3} alignItems="center" justifyContent="space-evenly">
      <Heading size="md">Olá {payload.username}</Heading>
      <Button size="sm" colorScheme="whatsapp" onClick={signout}>
        Sair
      </Button>
    </Flex>
  );
};
