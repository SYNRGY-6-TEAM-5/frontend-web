import SuccessList from "./components/SuccessList";

import CopyrightSearch from "@/components/containers/Copyright";
import FooterSearch from "@/components/containers/Footer";
import NavBar from "@/components/containers/NavBar";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import DialogBoardingPass from "../profile/pages/my-flight/components/containers/DialogBoardingPass";
import { useGetDetailUserBooking } from "@/lib/hooks/useProfileBooking";
import { Spinner } from "@phosphor-icons/react";

const SuccessCheckIn = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isFetching } = useGetDetailUserBooking(id);

  return (
    <>
      <NavBar />
      <div className="relative mt-24 flex min-h-screen bg-[#FBFBFB] md:px-9 lg:justify-between lg:px-20 ">
        <div className="my-8 flex grow justify-center">
          <div className="flex w-screen flex-col justify-center max-w-[607px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0881904347f5635c44f30f51f8f4cd2488a37bd1afbbc92ed2799aed75a5fc99?"
              className="aspect-square w-[124px] max-w-full self-center"
            />
            <div className="mt-12 flex w-full items-center justify-center px-16 text-center text-neutral-900 max-md:mt-10 max-md:max-w-full max-md:px-5">
              <div className="flex w-[317px] max-w-full flex-col">
                <div className="text-2xl font-medium leading-8">
                  Your online check-in has been successful
                </div>
                <div className="mt-3 text-xs leading-5">
                  Please pay attention to the instructions below regarding to
                  your flight
                </div>
              </div>
            </div>
            <div className="mt-6 h-px w-[261px] max-w-full self-center bg-zinc-200" />
            <SuccessList />
            <div className="mt-12 flex w-full items-center justify-center whitespace-nowrap px-16 text-sm font-medium max-md:mt-10 max-md:max-w-full max-md:px-5">
              <div className="flex w-[343px] max-w-full flex-col">
                {isFetching ? (
                  <Button
                    type="button"
                    variant="primary"
                    className="h-14 items-center justify-center rounded-xl border-[1.5px] border-solid px-16 py-5 text-primary-500"
                  >
                    <Spinner className="mr-1 h-5 w-5 animate-spin text-white" />
                  </Button>
                ) : (
                  <DialogBoardingPass booking={data!} />
                )}
                <Button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="mt-6 h-14 items-center justify-center rounded-xl border-[1.5px] border-solid border-primary-100 bg-[#FBFBFB] px-16 py-5 text-primary-500 hover:bg-primary-50 max-md:px-5"
                >
                  Back to Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSearch />
      <CopyrightSearch />
    </>
  );
};

export default SuccessCheckIn;
