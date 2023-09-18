import { useState } from "react";
import { useAuthStore } from "../../stores/auth";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const { authenticate } = useAuthStore();
  useState(() => authenticate());

  return children;
};
