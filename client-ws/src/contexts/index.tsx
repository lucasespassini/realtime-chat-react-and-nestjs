import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./auth/AuthContext";
import { UserProvider } from "./web_socket/UserContext";

export const AppProviders = ({ children }: { children: JSX.Element }) => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};
