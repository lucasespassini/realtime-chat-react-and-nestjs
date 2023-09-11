import { Container, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthStore } from "../stores/auth";

export const HomePage = () => {
  const { socket } = useAuthStore();

  useEffect(() => {
    socket.on("showUsers", (users) => {
      console.log(users);
    });
  }, [socket]);

  return (
    <Container>
      <Text>HomePage</Text>
    </Container>
  );
};
