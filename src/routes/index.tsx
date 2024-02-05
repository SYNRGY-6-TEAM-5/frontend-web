import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import NavBar from "../components/containers/NavBar";
import FooterSearch from "../components/containers/Footer";
import PasswordOTP from "@/pages/forget-password/otp";
import ChangePasswordMethod from "@/pages/forget-password/method";
import ChangePassword from "@/pages/forget-password/change-password";
import ForgotPassword from "@/pages/forget-password";
import ResetPassword from "@/pages/forget-password/reset";
import SetupProfile from "@/pages/setup-profile";
import AccountCreated from "@/pages/account-created";
import TermsOfService from "@/pages/terms-of-service";
import SearchFlight from "@/pages/search-flight";
import Payment from "@/pages/payment";
import Booking from "@/pages/booking";
import LayoutUser from "@/layout/user";
import PaymentDetails from "@/pages/paymentDetails";
import { TicketProvider } from "@/context/TicketContext";
import Profile from "@/pages/profile";
import MyFlight from "@/pages/profile/pages/my-flight";
import EditProfile from "@/pages/profile/pages/edit";
import Order from "@/pages/profile/pages/order";
import Passenger from "@/pages/profile/pages/passenger";
import Notification from "@/pages/profile/pages/notification";
import Faq from "@/pages/profile/pages/faq";
import WaitingPayment from "@/pages/profile/pages/my-flight/components/WaitingPaymentPage";
import SuccessfullPayment from "@/pages/profile/pages/my-flight/components/SuccessfullPaymentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <Home />
        <FooterSearch />
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
    path: "/flight/",
    element: (
      <TicketProvider>
        <Outlet></Outlet>
      </TicketProvider>
    ),
    children: [
      {
        path: "/flight/search-flight",
        element: <SearchFlight />,
      },
      {
        path: "/flight/booking",
        element: <Booking />,
      },
    ],
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
      {
        path: "/user/payment-details",
        element: (
          <LayoutUser>
            <PaymentDetails />
          </LayoutUser>
        ),
      },
    ],
  },
  {
    path: "/profile",
    element: <Profile />,
    children: [
      {
        path: "/profile",
        element: <MyFlight />,
      },
      {
        path: "/profile/payment",
        element: <WaitingPayment />,
      },
      {
        path: "/profile/success",
        element: <SuccessfullPayment />,
      },
      {
        path: "/profile/edit",
        element: <EditProfile />,
      },
      {
        path: "/profile/order",
        element: <Order />,
      },
      {
        path: "/profile/passenger-data",
        element: <Passenger />,
      },
      {
        path: "/profile/notification",
        element: <Notification />,
      },
      {
        path: "/profile/faq",
        element: <Faq />,
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
