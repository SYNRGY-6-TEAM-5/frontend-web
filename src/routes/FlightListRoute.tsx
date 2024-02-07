import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSearchTicketStore } from "@/store/useSearchTicketStore";

interface BookingRouteProps {
  children: ReactNode;
}

const FlightListRoute = ({ children }: BookingRouteProps) => {
  const { tripDetails } = useSearchTicketStore();

  if (tripDetails.total_seat === 0) {
    return <Navigate to="/" />;
  }

  return children;
};

export default FlightListRoute;
