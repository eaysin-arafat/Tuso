import { lazy } from "react";
const PageNotFound = lazy(() => import("@/components/not-found/PageNotFound"));
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";


const Routes = [
  ...PrivateRoutes,
  ...PublicRoutes,
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default Routes;
