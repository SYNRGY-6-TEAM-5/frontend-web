import { useEffect, useState } from "react";
import BookingDetail from "./components/booking-detail";
import ContactDetail from "./components/contact-detail";
import ExtraProtect from "./components/extra-protect";
import BookingNavbar from "./components/navbar";
import PassangerDetail from "./components/passanger-detail";
import TravelAddOns from "./components/travel-add";
import CheckoutButton from "./components/ui/CheckoutButton";
import { Stepper } from '@mantine/core';

import { usePassengerStore } from "@/store/useBookingStore";
import { User2Icon } from "lucide-react";
import { CirclesThreePlus, Shield, UserList } from "@phosphor-icons/react";

const Booking = () => {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const { completeBookingData, updateCompleteBookingData } = usePassengerStore();
  const [_, setBookingDataChanged] = useState(false);

  useEffect(() => {
    setBookingDataChanged(prev => !prev);
  }, [completeBookingData, updateCompleteBookingData]);

  return (
    <div className="min-h-screen bg-[#FBFBFB]">
      <BookingNavbar />
      <div className="container mt-16">
        <div className="justify-center md:justify-between lg:flex-row-reverse flex-col lg:flex">
          <div className="w-full lg:w-4/12 order-2 md:order-1">
            <BookingDetail />
          </div>
          <div className="w-full lg:w-7/12 order-1 md:order-2 bg-white px-4 pt-8">
            <Stepper color="#F74E28" size="xs" active={active} onStepClick={setActive} allowNextStepsSelect={false}>
              <Stepper.Step icon={<User2Icon />} >
                <ContactDetail nextStep={nextStep} prevStep={prevStep} />
              </Stepper.Step>
              <Stepper.Step icon={<UserList />}>
                <PassangerDetail nextStep={nextStep} prevStep={prevStep} />
              </Stepper.Step>
              <Stepper.Step icon={<CirclesThreePlus />}>
                <TravelAddOns nextStep={nextStep} prevStep={prevStep} />
              </Stepper.Step>
              <Stepper.Step icon={<Shield />}>
                <ExtraProtect nextStep={nextStep} prevStep={prevStep} />
              </Stepper.Step>
              <Stepper.Completed>
                <CheckoutButton />
              </Stepper.Completed>
            </Stepper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
