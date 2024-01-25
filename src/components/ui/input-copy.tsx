import { Button } from "./button";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { Toaster } from "./sonner";
import { toast } from "sonner";


type ListProps = {
  name: string;
  id: string;
  className?: string;
  value?: string | number | undefined;
  error?: boolean;
};

const InputCopy = ({
  id,
  name,
  className,
  value,
  error,
}: ListProps) => {

  const handleCopyText = () => {
    navigator.clipboard.writeText(String(value));
    toast.success("Text Copied", {
    })
  };

  return (
    <div
      className={cn(
        "flex flex-row bg-gray-100 rounded-lg",
        error && "border-red-400 !text-red-400",
        className,
      )}
    >
      <Input
        id={id}
        name={name}
        type={"text"}
        value={value}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        className={cn(
          " text-black text-sm font-medium rounded-none border-0 bg-transparent",
          error && "!text-red-400",
        )}
        disabled
      />
      <Button
        variant={"link"}
        type="button"
        className={cn("text-primary-500", error && "!text-red-400")}
        onClick={handleCopyText}
      >
        <Copy size={24} />
      </Button>
      <Toaster />
    </div>
  );
};

export default InputCopy;
