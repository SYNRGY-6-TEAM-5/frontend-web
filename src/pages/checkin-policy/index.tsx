import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import PassengerRequirements from "./components/PassengerRequirement";
import DangerousGoods from "./components/DangerousGoods";
import ImportantInformation from "./components/InformationImportant";

const CheckinPolicy = () => {
  const [checkbox, setCheckbox] = useState(false);
  return (
    <>
      <Dialog>
        <DialogOverlay className="bg-transparent" />
        <DialogTrigger asChild>
          <Button variant="outline">Click</Button>
        </DialogTrigger>
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
                width: "1500px",
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
            className="mt-6 h-14 w-full rounded-xl"
          >
            Continue
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckinPolicy;
