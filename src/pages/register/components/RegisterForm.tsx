import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { GoogleLogo } from "@/assets/svg";
import { useNavigate } from "react-router-dom";
import PasswordInput from "@/components/ui/password-input";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const RegisterForm = ({ className, ...props }: UserAuthFormProps) => {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState<boolean>();

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    setIsPending(true);
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    console.log({ email, password });
    setIsPending(false);

    navigate("/otp");
  };

  return (
    <div className={cn("grid gap-3", className)} {...props}>
      <form onSubmit={handleOnSubmit}>
        <div className="grid gap-6">
          <div className="grid gap-5">
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="text"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                className="border-b-grey-500 rounded-none border-0 border-b px-0 py-2.5 text-base text-slate-700 placeholder:text-gray-300"
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="h-14 rounded-xl bg-primary-500 py-4 text-white"
          >
            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
        </div>
      </form>
      <div className="grid">
        <Button
          variant="outline"
          type="button"
          disabled={isPending}
          className="h-14 gap-2 rounded-xl border-gray-200"
        >
          {isPending ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GoogleLogo />
          )}
          Sign Up with Google
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
