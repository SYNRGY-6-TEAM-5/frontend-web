import SuccessList from "./components/SuccessList";

import CopyrightSearch from "@/components/containers/Copyright";
import FooterSearch from "@/components/containers/Footer";
import NavBar from "@/components/containers/NavBar";
import { Button } from "@/components/ui/button";


const SuccessCheckIn = () => {
  return (
    <>
      <NavBar />
      <div className="relative mt-24 flex min-h-screen bg-[#FBFBFB] px-6 md:px-9 lg:justify-between lg:px-20 ">
        {/* <div className="my-8 mr-20 w-[343px] flex-none">
          <div className="sticky top-32 rounded-xl bg-white shadow-sm">
          </div>
        </div> */}
        <div className="mt-8 grow flex justify-center">
          <div className="flex flex-col justify-center max-w-[607px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0881904347f5635c44f30f51f8f4cd2488a37bd1afbbc92ed2799aed75a5fc99?"
              className="self-center max-w-full aspect-square w-[124px]"
            />
            <div className="flex justify-center items-center px-16 mt-12 w-full text-center text-neutral-900 max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col max-w-full w-[317px]">
                <div className="text-2xl font-medium leading-8">
                  Your online check-in has been successful
                </div>
                <div className="mt-3 text-xs leading-5">
                  Please pay attention to the instructions below regarding to your
                  flight
                </div>
              </div>
            </div>
            <div className="self-center mt-6 max-w-full h-px bg-zinc-200 w-[261px]" />
            <SuccessList />
            <div className="flex justify-center items-center px-16 mt-12 w-full text-sm font-medium whitespace-nowrap max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col max-w-full w-[343px]">
                <Button className="justify-center items-center px-16 py-5 text-white bg-red-500 rounded-xl max-md:px-5">
                  See Boarding Pass
                </Button>
                <Button className="justify-center items-center px-16 py-5 mt-6 text-red-500 rounded-xl border-solid border-[1.5px] border-[color:var(--Primary-100,#FDD7CE)] bg-[#FBFBFB] max-md:px-5">
                  Back to Home
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