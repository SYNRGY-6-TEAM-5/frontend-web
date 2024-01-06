import { useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "@/lib/utils";

type ListProps = {
  name: string;
  id: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | undefined;
  error?: boolean;
};

const PasswordInput = ({
  id,
  name,
  placeholder = "Password",
  className,
  onChange,
  value,
  error,
}: ListProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisible = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div
      className={cn(
        "flex flex-row border-b border-gray-200",
        error && "border-red-400 !text-red-400",
        className,
      )}
    >
      <Input
        id={id}
        name={name}
        type={isPasswordVisible ? "text" : "password"}
        placeholder={placeholder ?? "Password"}
        onChange={onChange}
        value={value}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        className={cn(
          "placeholder:text-gray-300 text-slate-700 rounded-none border-0 px-0 py-2.5 text-base",
          error && "!text-red-400",
        )}
        required
      />
      <Button
        variant={"link"}
        type="button"
        className={cn("text-gray-300", error && "!text-red-400")}
        onClick={togglePasswordVisible}
      >
        {isPasswordVisible ? <EyeSlash size={24} /> : <Eye size={24} />}
      </Button>
    </div>
  );
};

export default PasswordInput;
