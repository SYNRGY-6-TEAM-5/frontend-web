import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import NavBar from "../components/containers/NavBar";
import Footer from "../components/containers/Footer";
import PasswordOTP from "@/pages/forget-password/otp";
import ChangePasswordMethod from "@/pages/forget-password/method";
import ChangePassword from "@/pages/forget-password/change-password";
import ForgotPassword from "@/pages/forget-password";
import ResetPassword from "@/pages/forget-password/reset";
import SetupProfile from "@/pages/setup-profile";
import AccountCreated from "@/pages/account-created";
import TermsOfService from "@/pages/terms-of-service";
import FlightList from "@/pages/flight-list";
import Payment from "@/pages/payment";
import Booking from "@/pages/booking";
import LayoutUser from "@/layput/user";

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
    path: "/otp",
    element: <PasswordOTP />,
  },
  {
    path: "/setup-profile",
    element: <SetupProfile />,
  },
  {
    path: "/account-created",
    element: <AccountCreated />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
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
    path: "/forgot-password/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/forgot-password/reset",
    element: <ResetPassword />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/flight-list",
    element: <FlightList />,
  },
  {
    path: "/booking",
    element: <Booking />,
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <Outlet></Outlet>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/user/payment",
        element: (
          <LayoutUser>
            <Payment />
          </LayoutUser>
        ),
      },
    ],
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
