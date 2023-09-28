import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth/AuthContext";
import { UserProvider } from "./web_socket/UserContext";
import { queryClient } from "../services/queryClient";
import { ChatProvider } from "./web_socket/ChatContext";

export const AppProviders = ({ children }: { children: JSX.Element }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider>
          <ChatProvider>
            <UserProvider>{children}</UserProvider>
          </ChatProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
