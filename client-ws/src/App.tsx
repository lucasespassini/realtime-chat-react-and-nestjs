import { useEffect } from "react";
import { Chat } from "./components/chat/Chat";
import { Join } from "./components/join/Join";
import { useUserStore } from "./stores/user";

export const App = () => {
  const { isAuthenticated, login } = useUserStore();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) login(username);
  }, [login]);

  return <>{isAuthenticated ? <Chat /> : <Join />}</>;
};
