import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginForm = ({ className, ...props }: UserAuthFormProps) => {
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
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                className="border-0 border-b border-b-grey-500 rounded-none py-2.5 px-0 text-base"
              />
            </div>
          </div>
          <Link to={'/forgot-password'} className="text-right text-gray-400 text-sm text-medium">
            Forgot Password
          </Link>
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
            <img src="./src/assets/google.svg" />
          )}
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
