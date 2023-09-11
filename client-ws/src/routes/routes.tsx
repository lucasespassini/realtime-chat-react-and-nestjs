import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "../pages/AuthPage";
import { HomePage } from "../pages/HomePage";
import { Header } from "../components/header";
import { useAuthStore } from "../stores/auth";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const AppRoutes = () => {
  const { isAuthenticated, authenticate } = useAuthStore();

  useEffect(() => {
    authenticate();
  }, [authenticate]);

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
