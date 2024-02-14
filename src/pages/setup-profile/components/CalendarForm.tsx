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

interface props {
  formik: FormikValues;
}

const CalendarForm = ({ formik }: props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"link"}
          className={cn(
            "mb-5 w-full rounded-none border-b pl-0 text-left text-base font-normal text-gray-300 decoration-transparent",
            formik.values.dateOfBirth && "text-black",
            formik.errors.dateOfBirth && "border-b-red-500 text-red-500",
          )}
        >
          {formik.values.dateOfBirth
            ? format(formik.values.dateOfBirth, "dd / MM / yyyy")
            : "Date of Birth"}
          {formik.errors.dateOfBirth ? (
            <Info className="ml-auto h-5 w-5 text-red-500" />
          ) : (
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={formik.values.dateOfBirth}
          onSelect={(e) => {
            formik.setFieldValue("dateOfBirth", e);
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          defaultMonth={formik.values.dateOfBirth}
          captionLayout="dropdown-buttons"
          fromDate={new Date("1960-01-01")}
          toDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarForm;
