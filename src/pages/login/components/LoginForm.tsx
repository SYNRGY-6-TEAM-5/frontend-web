import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { GoogleLogo  } from "@phosphor-icons/react";
import { Eye } from "@phosphor-icons/react";
import { EyeSlash } from "@phosphor-icons/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginForm = ({ className, ...props }: UserAuthFormProps) => {
  const [isPending, setIsPending] = useState<boolean>();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisible = () => {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    setIsPending(true);
		e.preventDefault();
		const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

		const email = target.email.value;
		const password = target.password.value;

		console.log({email, password});
    setIsPending(false);
	};

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form
        onSubmit={handleOnSubmit}
      >
        <div className="grid gap-6">
          <div className="grid gap-5">
            <div className="grid gap-1.5">
              <Label htmlFor="email">
                Email / Phone Number
              </Label>
              <Input
                id="email"
                placeholder="Enter your email / phone number"
                type="text"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                className="border-0 border-b border-b-grey-500 rounded-none py-2.5 px-0 text-base"
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">
                Password
              </Label>
              <div className="flex flex-row">
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  className="border-0 border-b border-b-grey-500 rounded-none py-2.5 px-0 text-base"
                  required
                />
                <Button variant="transparent" className="border-b-[1px]" type="button" onClick={togglePasswordVisible}>
                  {isPasswordVisible ? (
                    <EyeSlash size={24} />
                  ) : (
                    <Eye size={24} />
                  )} 
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Link to={'/forgot-password'} className="text-right text-gray-400 text-sm text-medium">
              Forgot Password
            </Link>
          </div>
          <Button type="submit" className="py-4 bg-primary-500 text-white rounded-xl">
            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Sign In 
          </Button>
        </div>
      </form>
      <div className="grid">
        <Button variant="outline" type="button" disabled={isPending} className="rounded-xl border-gray-200 gap-2">
          {isPending ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GoogleLogo size={24} weight="bold" />
          )}
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
