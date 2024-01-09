import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FieldProps {
  onChange: (value: string) => void; // Adjust this type as per your field's onChange handler
  // ... other necessary properties from the field object
}

const SelectComponent: React.FC<{ field: FieldProps }> = ({ field }) => {
  return (
    <Select onValueChange={field.onChange}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select a verified email to display" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="m@example.com">m@example.com</SelectItem>
        <SelectItem value="m@google.com">m@google.com</SelectItem>
        <SelectItem value="m@support.com">m@support.com</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
