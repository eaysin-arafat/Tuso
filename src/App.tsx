import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ErrorBoundaryFallback from "./components/error-boundary/ErrorBoundaryFallback";
import useAuthCheck from "./hooks/auth/useAuthCheck";
import Routes from "./routers/ApplicationRouter";
import Loader from "./components/core/loader/Loader";

const router = createBrowserRouter([
  {
    children: Routes,
    errorElement: <ErrorBoundaryFallback />,
  },
]);

function App() {
  const { isAuthChecking } = useAuthCheck();

  return isAuthChecking ? <Loader /> : <RouterProvider router={router} />;
}

export default App;
