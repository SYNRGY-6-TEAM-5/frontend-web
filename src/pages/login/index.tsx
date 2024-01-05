import { Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <>
      <div className="container relative hidden md:h-[100vh] flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:p-0 min-[320px]:grid min-[320px]:py-5">
        <div className="lg:bg-login-bg bg-cover relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        </div>
        <div className="lg:p-8 space-y-24">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-3 text-center">
              <div className="mx-auto mb-3">
                <img src="./src/assets/Vector.svg"/>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-muted-foreground text-sm text-gray-400">
                Welcome back! Please enter your details.
              </p>
            </div>
            <LoginForm />
            <p className="text-muted-foreground px-8 text-center text-sm">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="hover:text-primary text-primary-500 font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
          <div className="flex sm:w-6/12 flex-col justify-center mx-auto text-center text-wrap min-[320px]:px-6 min-[320px]:pb-8">
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-xs text-center">
                  By continuing you agree to our
                  <Link to="/term" className="text-primary-500 font-medium">
                    T&Cs
                  </Link>
                  . We use your data to offer you a personalized experience
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
