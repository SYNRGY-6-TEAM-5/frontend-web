import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/password-input";
import { cn } from "@/lib/utils";
import { GoogleLogo } from "@/assets/svg";
import { Loader } from "lucide-react";
import { useGoogleLogin } from '@react-oauth/google';
import Allert from "@/components/containers/Allert";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface PostLogin {
  email: string;
  password: string;
}

const LoginForm = ({ className, ...props }: UserAuthFormProps) => {
  const API = 'https://backend-java-production-ece2.up.railway.app/api/v1/auth/login';
  const GoogleAPI = 'http://localhost:8000/v1/users/googleAuth';
  const navigate = useNavigate();
  const [googleIsPending, setGoogleIsPending] = useState<boolean>();
  const [isPending, setIsPending] = useState<boolean>();

  const token = Cookies.get('accesstoken');
  const role = Cookies.get('role');
  const [error, setError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

  const login = useGoogleLogin({
    onSuccess: async (tokenResp) => {
      const response = await fetch(GoogleAPI, {
        method: 'POST',
				headers: {
          Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokenResp.access_token}`,
				},
			});

      console.log("masuk");
			const resJson = await response.json();
			console.log({response: resJson});
      setGoogleIsPending(false);
			if(resJson.data) {
				navigate('/admin/flight/list');
			}
		},
	});

	const handleLogin = () => {
    setGoogleIsPending(true);
		login();
	};

  const post = ({email, password}:PostLogin) =>{
    axios.post(API,{
      emailAddress:email,
      password:password
    }).then((res) => {
      if(res.status === 401) {
        setError(true);
        setMessage("Email yang Anda masukkan belum terdaftar");
      }
      if(res.status === 200) {
        setError(false);
        setMessage("Successfully Login")
        Cookies.set('accesstoken', res.data.token);
        Cookies.set('role',res.data.roles);
        setIsPending(false);
    } else {
        setError(true);
        setMessage("Login Error, Pastikan data benar");
      }
    }).catch(() =>{
      setError(true);
      setMessage("Login Error, Pastikan data benar");
      setIsPending(false);
    })
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

    await post({email, password});
  };

  if(token){
    if(role === 'USER') {
      return <Navigate to={'/user/payment'} replace/>;
    }
    if(role === 'ADMIN') {
      return <Navigate to={'/admin/dashboard'} replace/>;
    }
  }
  return (
    <div className={cn("grid gap-3", className)} {...props}>
      {error && <Allert variant="destructive" tittle="Error" desc={message}/>}
      <form onSubmit={handleOnSubmit}>
        <div className="grid gap-6">
          <div className="grid gap-5">
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email / Phone Number</Label>
              <Input
                id="email"
                placeholder="Enter your email / phone number"
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
          <div className="flex justify-end">
            <Link
              to={"/forgot-password"}
              className="text-medium text-right text-sm text-gray-400"
            >
              Forgot Password
            </Link>
          </div>
          <Button
            type="submit"
            className="h-14 rounded-xl bg-primary-500 py-4 text-white"
          >
            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </div>
      </form>
      <div className="grid">
        <Button
          variant="outline"
          type="button"
          disabled={googleIsPending}
          onClick={handleLogin}
          className="h-14 gap-2 rounded-xl border-gray-200"
        >
          {googleIsPending ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GoogleLogo />
          )}
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
