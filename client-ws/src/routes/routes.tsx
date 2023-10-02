import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "../pages/Auth/AuthPage";
import { HomePage } from "../pages/HomePage";
import { useAuthStore } from "../stores/auth";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const AppRoutes = () => {
  const { isAuthenticated } = useAuthStore();

  const PrivateRoute = ({ children }: PrivateRouteProps) =>
    isAuthenticated ? children : <Navigate to="/auth" />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
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
