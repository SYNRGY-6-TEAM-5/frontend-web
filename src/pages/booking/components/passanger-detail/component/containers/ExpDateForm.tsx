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
  _id: string;
  _expKey: string;
}

const ExpirationDateForm = ({ formik, _id, _expKey }: props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"link"}
          className={cn(
            "mb-5 w-full rounded-none border-b pl-0 text-left text-base font-normal text-gray-300 decoration-transparent",
            formik.values[_expKey] && "text-black",
            formik.errors[_expKey] && "border-b-red-500 text-red-500",
          )}
        >
          {formik.values[_expKey]
            ? format(formik.values[_expKey], "dd / MM / yyyy")
            : "Expiry Date"}
          {formik.errors[_expKey] ? (
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
          selected={formik.values[_expKey]?.toISOString()}
          onSelect={(e) => {
            formik.setFieldValue(_expKey, e);
          }}
          disabled={(date) =>
            date < new Date()
          }
          defaultMonth={formik.values[_expKey]}
          captionLayout="dropdown-buttons"
          fromDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ExpirationDateForm;
