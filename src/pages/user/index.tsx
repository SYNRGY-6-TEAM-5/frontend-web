import BookingDetail from "./components/booking-detail";
import ContactDetail from "./components/contact-detail";
import ExtraProtect from "./components/extra-protect";
import BookingNavbar from "./components/navbar";
import PassangerDetail from "./components/passanger-detail";
import TravelAddOns from "./components/travel-add";
import CheckoutButton from "./components/ui/CheckoutButton";

const Booking = () => {
  return (
    <div className="min-h-screen bg-[#FBFBFB]">
      <BookingNavbar />
      <div className="container mt-16">
        <div className="justify-between md:flex">
          <div className="w-7/12">
            <ContactDetail />
            <PassangerDetail />
            <TravelAddOns />
            <ExtraProtect />
            <CheckoutButton />
          </div>
          <div className="w-4/12">
            <BookingDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
