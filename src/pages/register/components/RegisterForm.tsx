import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { GoogleLogo } from "@/assets/svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordInput from "@/components/ui/password-input";
import Allert from "@/components/containers/Allert";
import Cookies from "js-cookie";
import { useGoogleLogin } from "@react-oauth/google";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface PostRegister {
  email: string;
  password: string;
}

const RegisterForm = ({ className, ...props }: UserAuthFormProps) => {
  const API =
    "https://backend-java-production-ece2.up.railway.app/api/v1/auth/signup";
  const GoogleAPI = "http://localhost:8000/v1/users/googleAuth";
  const navigate = useNavigate();
  const [googleIsPending, setGoogleIsPending] = useState<boolean>();
  const [isPending, setIsPending] = useState<boolean>();

  const token = Cookies.get("accesstoken");
  const role = Cookies.get("role");
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  if (token) {
    role === "USER" && navigate("/user/payment");
    role === "ADMIN" && navigate("/admin/dashboard");
  }

  const register = useGoogleLogin({
    onSuccess: async (tokenResp) => {
      try {
        // Make a request to your backend for user registration
        const registrationResponse = await fetch(GoogleAPI, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenResp.access_token}`,
          },
        });

        const registrationJson = await registrationResponse.json();

        if (registrationJson.data) {
          // Registration successful, navigate to the login page
          navigate("/login");
        } else {
          // Handle registration failure, show an error message or take appropriate action
          console.error("Registration failed:", registrationJson.error);
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Error during registration:", error);
      } finally {
        // Set loading state to false
        setGoogleIsPending(false);
      }
    },
  });

  const handleRegister = () => {
    setGoogleIsPending(true);
    register();
  };

  const post = ({ email, password }: PostRegister) => {
    axios
      .post(API, {
        emailAddress: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 201) {
          setError(false);
          setMessage("Successfully Registered");

          // Set cookies and navigate to OTP page after successful registration
          Cookies.set("accesstoken", res.data.token);
          Cookies.set("role", res.data.roles);
          setIsPending(false);

          // Navigate to the OTP page upon successful registration
          navigate("/otp");
        } else {
          setError(true);
          setMessage("Registration Error, Please check your data");
        }
      })
      .catch(() => {
        console.error("Registration Error:", error);

        // Handle different types of errors (validation errors, etc.) from the server
        if (error.response) {
          console.error(
            "Server responded with non-success status:",
            error.response.data,
          );
          // Additional handling based on the error response from the server
        } else if (error.request) {
          console.error("No response received from the server:", error.request);
          // Additional handling for cases where no response is received from the server
        } else {
          console.error("Error setting up the request:", error.message);
          // Additional handling for other types of errors
        }

        setError(true);
        setMessage("Registration Error, Please check your data");
        setIsPending(false);
      });
  };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    setIsPending(true);
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    // Call the modified post function for user registration
    await post({ email, password });
  };

  return (
    <div className={cn("grid gap-3", className)} {...props}>
      {error && <Allert variant="destructive" tittle="Error" desc={message} />}
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
          disabled={googleIsPending}
          onClick={handleRegister}
          className="h-14 gap-2 rounded-xl border-gray-200"
        >
          {googleIsPending ? (
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
