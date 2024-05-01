import { lazy } from "react";

const PublicGuard = lazy(() => import("@/components/guards/PublicGuard"));
const SignIn = lazy(() => import("@/pages/home/user-signin/SignIn"));

// routes for public pages
const PublicRoutes = [
  {
    element: <PublicGuard />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
    ],
  },
];

export default PublicRoutes;
