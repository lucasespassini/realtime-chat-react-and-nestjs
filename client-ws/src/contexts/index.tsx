import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth/AuthContext";
import { UserProvider } from "./web_socket/UserContext";
import { queryClient } from "../services/queryClient";

export const AppProviders = ({ children }: { children: JSX.Element }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider>
          <UserProvider>{children}</UserProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
