import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormikValues } from "formik";
import { Info } from "@phosphor-icons/react";
import { ISavedPassengerData } from "@/types/Booking";

interface props {
  data: ISavedPassengerData;
  formik: FormikValues;
  _id: string;
}

const SavedDoBForm = ({ formik, _id, data }: props) => {
  console.log(data.date_of_birth);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"link"}
          className={cn(
            "mb-5 w-full rounded-none border-b pl-0 text-left text-base font-normal text-gray-300 decoration-transparent",
            formik.values.date_of_birth && "text-black",
            formik.errors.date_of_birth && "border-b-red-500 text-red-500",
          )}
        >
          {formik.values.date_of_birth
            ? format(formik.values.date_of_birth, "dd / MM / yyyy")
            : format(data.date_of_birth ? data.date_of_birth : new Date(), "dd / MM / yyyy")}
          {formik.errors.date_of_birth ? (
            <Info className="ml-auto h-5 w-5 text-red-500" />
          ) : (
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          id={_id}
          selected={formik.values.date_of_birth}
          onSelect={(date) => {
            formik.setFieldValue("date_of_birth", date); // Update the field value with the selected date
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          defaultMonth={formik.values.date_of_birth}
          captionLayout="dropdown-buttons"
          fromDate={new Date("1960-01-01")}
          toDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SavedDoBForm;
