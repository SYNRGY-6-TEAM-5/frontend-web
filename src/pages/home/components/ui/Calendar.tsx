import { FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { Text } from "@mantine/core";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FieldProps {
  value: Date | undefined; // Adjust this to match the Date type or undefined
  onChange: (value: Date | undefined) => void; // Update the onChange function to accept Date or undefined
}

const DatePicker: React.FC<{ field: FieldProps }> = ({ field }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            className={cn(
              "w-full bg-zinc-900 pl-3 text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <Text className="w-full text-start text-sm font-semibold text-slate-400 lg:text-sm">
                Pick departure date
              </Text>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 text-primary-500 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={(date: Date | undefined) => field.onChange(date)}
          disabled={(date) => date < new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
