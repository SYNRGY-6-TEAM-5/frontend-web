import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useCartStore } from "@/store/useCartStore";

interface BookingRouteProps {
  children: ReactNode;
}

const BookingRoute = ({ children }: BookingRouteProps) => {
  const { cart } = useCartStore();

  if (!cart[0]) {
    return <Navigate to="/" />;
  }

  return children;
};

export default BookingRoute;
