import { Link, Navigate } from "react-router-dom";
import { MainLogo } from "@/assets/svg";
import RegisterForm from "./components/RegisterForm";
import Cookies from "js-cookie";

const Register = () => {
  const token = Cookies.get("accesstoken");
  const role = Cookies.get("role");

  if (token) {
    return role === "USER" ? (
      <Navigate to={"/"} replace />
    ) : (
      <Navigate to={"/admin/dashboard"} replace />
    );
  }

  return (
    <>
      <div className="container relative hidden flex-col items-center justify-center min-[320px]:grid min-[320px]:py-5 md:h-[100vh] lg:max-w-none lg:grid-cols-2 lg:p-0">
        <div className="relative h-full flex-col bg-cover p-10 text-white md:hidden lg:flex lg:bg-register-bg dark:border-r"></div>
        <div className="space-y-24 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-3 text-center">
              <div className="mx-auto mb-3">
                <MainLogo className="w-full" />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Create an Account
              </h1>
              <p className="text-muted-foreground text-sm text-gray-400">
                Please enter your valid data in order to create an account.
              </p>
            </div>
            <RegisterForm />
            <p className="text-muted-foreground px-8 text-center text-sm min-[320px]:px-0 sm:w-full">
              Already have an account?{" "}
              <Link
                to="/login"
                className="hover:text-primary font-semibold text-primary-500"
              >
                Sign In
              </Link>
            </p>
          </div>
          <div className="mx-auto flex flex-col justify-center text-wrap text-center min-[320px]:px-6 min-[320px]:pb-8 sm:w-6/12">
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-center text-xs">
                  By continuing you agree to our
                  <Link to="/term" className="font-medium text-primary-500">
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

export default Register;
