import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import PassengerRequirements from "./components/PassengerRequirement";
import DangerousGoods from "./components/DangerousGoods";
import ImportantInformation from "./components/InformationImportant";
import { BookingUser, Passenger } from "@/types/BookingUser";
import { format, isAfter, isBefore, sub } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { useCheckInStore } from "@/store/useCheckInStore";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
interface props {
  booking: BookingUser;
  passanger: Passenger[];
}

const CheckinPolicy = ({ booking, passanger }: props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setUserData, setSelectedUser } = useCheckInStore();
  const [checkbox, setCheckbox] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const setupCheckin = () => {
    const formatPass = passanger.map((item) => ({
      id: item.passenger_id,
      nama: item.name,
      seat: "",
    }));
    setUserData(formatPass);
    setSelectedUser(formatPass[0].id);
    navigate(`/profile/checkin/${id}`);
  };

  const canCheckin = () => {
    const index =
      booking.tickets.length > 1
        ? isAfter(
            new Date(),
            booking.tickets[0].flight.departure.scheduled_time,
          )
          ? 0
          : 1
        : 0;

    const sehariSebelumBerangkat = sub(
      booking.tickets[index].flight.departure.scheduled_time,
      { days: 1 },
    );
    const lastCall = sub(
      booking.tickets[index].flight.departure.scheduled_time,
      {
        minutes: 75,
      },
    );

    if (
      isAfter(new Date(), sehariSebelumBerangkat) &&
      isBefore(new Date(), lastCall)
    ) {
      return (
        <Button
          type="button"
          variant="primary"
          className="h-14 w-full rounded-xl text-sm"
        >
          Check-In Online Now
        </Button>
      );
    } else {
      return (
        <Button
          type="button"
          variant="primary"
          className="h-14 w-full rounded-xl text-sm"
          disabled
        >
          You can check in at{" "}
          {format(sehariSebelumBerangkat, "EEEE, dd MMM yyyy hh:mm")}
        </Button>
      );
    }
  };

  if (!isDesktop) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{canCheckin()}</DrawerTrigger>
        <DrawerContent className="max-h-[85vh] w-full px-4">
          <DrawerHeader style={{ position: "relative" }}>
            <DrawerTitle>Check-In Online Policy</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto">
            <PassengerRequirements />
            <ImportantInformation />
            <DangerousGoods />
            <div>
              <div className=" flex items-start">
                <div className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    id="baggage-insurance-checkbox"
                    checked={checkbox}
                    onChange={() => setCheckbox(!checkbox)}
                    value=""
                    className="h-3 w-3 text-xs accent-primary-500"
                  />
                  <label
                    htmlFor="baggage-insurance-checkbox"
                    className={
                      checkbox
                        ? "text-xs font-medium  text-black"
                        : "text-xs font-medium text-gray-300"
                    }
                  >
                    I agree to the{" "}
                    <span className="font-semibold">check-in policy</span>
                  </label>
                </div>
              </div>
            </div>
            <Button
              type="button"
              variant="primary"
              className={`mt-6 h-14 w-full rounded-xl ${
                !checkbox && "cursor-not-allowed"
              }`}
              disabled={!checkbox}
              onClick={setupCheckin}
            >
              Continue
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <>
      <Dialog>
        <DialogOverlay className="bg-transparent" />
        <DialogTrigger asChild>{canCheckin()}</DialogTrigger>
        <DialogContent className="max-h-[85vh] overflow-auto sm:max-w-md">
          <DialogHeader style={{ position: "relative" }}>
            <DialogTitle className="absolute top-[-10px]">
              Check-In Online Policy
            </DialogTitle>
            <hr
              className="absolute mt-8 w-full border-gray-200"
              style={{
                bottom: "-1.5rem",
                left: -30,
                right: -10,
                width: "inherit",
              }}
            />
          </DialogHeader>

          <PassengerRequirements />

          <ImportantInformation />

          <DangerousGoods />

          <div>
            <div className=" flex items-start">
              <div className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  id="baggage-insurance-checkbox"
                  checked={checkbox}
                  onChange={() => setCheckbox(!checkbox)}
                  value=""
                  className="h-3 w-3 text-xs accent-primary-500"
                />
                <label
                  htmlFor="baggage-insurance-checkbox"
                  className={
                    checkbox
                      ? "text-xs font-medium  text-black"
                      : "text-xs font-medium text-gray-300"
                  }
                >
                  I agree to the{" "}
                  <span className="font-semibold">check-in policy</span>
                </label>
              </div>
            </div>
          </div>
          <Button
            type="button"
            variant="primary"
            className={`mt-6 h-14 w-full rounded-xl ${
              !checkbox && "cursor-not-allowed"
            }`}
            disabled={!checkbox}
            onClick={setupCheckin}
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckinPolicy;
