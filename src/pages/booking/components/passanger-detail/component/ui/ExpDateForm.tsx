import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormikValues } from "formik";
import { Info } from "@phosphor-icons/react";

interface ExpirationDateFormProps {
  formik: FormikValues;
  fieldName: string;
  index: number;
}

const ExpirationDateForm: React.FC<ExpirationDateFormProps> = ({ formik, fieldName, index }) => {
  const value = formik.values.travel_docs[index].expired_date;
  const expKey = fieldName;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"link"}
          className={`mb-5 w-full rounded-none border-b pl-0 text-left text-base font-normal ${
            value ? "text-black" : "text-gray-300"
          } ${formik.errors[expKey] ? "border-b-red-500 text-red-500" : ""}`}
        >
          {value ? format(value, "dd / MM / yyyy") : "Expiry Date"}
          {formik.errors[expKey] ? (
            <Info className="ml-auto h-5 w-5 text-red-500" />
          ) : (
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            formik.setFieldValue(`travel_docs[${index}].expired_date`, date);
          }}
          disabled={(date) => date < new Date()}
          defaultMonth={value}
          captionLayout="dropdown-buttons"
          fromDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ExpirationDateForm;