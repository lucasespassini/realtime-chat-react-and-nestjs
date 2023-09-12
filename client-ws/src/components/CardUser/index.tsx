import { Avatar, Badge, Flex, Heading } from "@chakra-ui/react";

type CardUserProps = {
  username: string;
  isOnline: boolean;
};

export const CardUser = ({ username, isOnline }: CardUserProps) => {
  return (
    <Flex
      px={4}
      py={3}
      w="15rem"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      gap={4}
      cursor="pointer"
      bg="#0f172a"
      border="1px solid #1e293b"
      borderRadius="10px"
    >
      <Avatar />

      <Flex w="100%" flexDir="column" alignItems="flex-start" gap={1}>
        <Heading size="md">
          {username.substring(0, 11)}
          {username.length > 11 && "..."}
        </Heading>
        <Badge colorScheme={isOnline ? "green" : "red"} fontSize=".6rem">
          {isOnline ? "Online" : "Offline"}
        </Badge>
      </Flex>
    </Flex>
  );
};
