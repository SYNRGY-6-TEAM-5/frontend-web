import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import NavBar from "../components/containers/NavBar";
import Footer from "../components/containers/Footer";
import PasswordOTP from "@/pages/forget-password/otp";
import ChangePasswordMethod from "@/pages/forget-password/method";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password/method",
    element: <ChangePasswordMethod />,
  },
  {
    path: "/forgot-password/otp",
    element: <PasswordOTP />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <></>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard/cars",
        element: <></>,
      },
      {
        path: "/dashboard/cars/:id",
        element: <></>,
      },
    ],
  },
]);

export default router;
