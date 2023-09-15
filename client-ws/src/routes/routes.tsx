import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { AuthPage } from "../pages/AuthPage";
import { HomePage } from "../pages/HomePage";
import { Header } from "../components/Header";
import { SocketUser } from "../constants/Types";
import { useAuthStore } from "../stores/auth";
import { useUserStore } from "../stores/user";
import { api } from "../services/api";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const AppRoutes = () => {
  const { socket, isAuthenticated, authenticate } = useAuthStore();
  const { setUsers } = useUserStore();

  useEffect(() => authenticate(), [authenticate]);

  useEffect(() => {
    socket?.on("showUsers", async (users: SocketUser[]) => {
      const newusers = [];
      setUsers([]);
      const { data } = await api.get("/users");

      for (const userData of data) {
        const newUser = users.find((user) => user.ulid === userData.usr_ulid);

        newusers.push({
          socketId: newUser ? newUser.socketId : null,
          ulid: newUser ? newUser.ulid : userData.usr_ulid,
          username: newUser ? newUser.username : userData.usr_username,
          isOnline: newUser ? true : false,
        });
      }

      setUsers(
        newusers.sort((a, b) => {
          if (a.isOnline > b.isOnline) return -1;
          if (a.isOnline < b.isOnline) return 1;
          return 0;
        })
      );
    });
  }, [setUsers, socket]);

  const PrivateRoute = ({ children }: PrivateRouteProps) =>
    isAuthenticated ? (
      <>
        <Header />
        {children}
      </>
    ) : (
      <Navigate to="/auth" />
    );

  const PublicRoute = ({ children }: PrivateRouteProps) =>
    isAuthenticated ? <Navigate to="/" /> : children;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
