/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import useAuth from "@/hooks/auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

// public guard component
const PublicGuard = () => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicGuard;
