import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

// useAuth hook for checking if the user is authenticated
const useAuth = () => {
  const { accessToken, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  if (accessToken && isLoggedIn) return true;
  return false;
};

export default useAuth;
