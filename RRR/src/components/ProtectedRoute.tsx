import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
export function ProtectedRoute({ children }: { children: any }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
