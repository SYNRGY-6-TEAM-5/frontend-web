import { Image } from "@/components/ui/Image";
import { Text } from "@mantine/core";
import { ArrowLeft, Spinner } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "@/assets/ArrowCircleRight.png";
import { Dot } from "lucide-react";
import { GarudaLogo } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import React from "react";
import { useCheckInStore } from "@/store/useCheckInStore";
import DialogBoardingPass from "../my-flight/components/containers/DialogBoardingPass";

const CheckInPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const { userData, setSelectedUser } = useCheckInStore();

  const loading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="mb-8 flex items-center">
        <ArrowLeft
          size={20}
          onClick={() => {
            navigate(-1);
          }}
          className="cursor-pointer hover:text-primary-500"
        />

        <div className="flex flex-1 flex-col text-center">
          <Text className="font-medium">Check-In Data</Text>
          <Text className="mt-1 text-xs font-normal text-gray-400">
            Booking Code:
          </Text>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex-1">
          <Text className="font-medium">Depart</Text>
          <div className="mt-3 rounded-lg px-3 py-4 shadow">
            <div className="flex justify-center">
              <Text className="text-3xl font-semibold">YIA</Text>
              <Image image={Arrow} alt="Arrow" className="mx-5 h-8" />
              <Text className="text-3xl font-semibold">CGK</Text>
            </div>
            <div className="my-3 h-px w-full bg-gray-200"></div>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <GarudaLogo className="w-6" />
                  <Text className="font-medium">GA207</Text>
                </div>
                <div className="inline-flex h-6 items-center justify-center rounded-full bg-gray-100 px-2">
                  <Text className="text-xs font-medium text-gray-500">
                    Non-stop
                  </Text>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-gray-400">
                Fri, 19 Jan <Dot className="h-4 w-4 text-black" />
                16:20 - 17:40
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {userData.map((item) => (
                <div
                  className="flex justify-between rounded-xl bg-gray-50 p-3"
                  key={item.id}
                >
                  <Text className="text-sm font-medium">{item.nama}</Text>
                  <Link
                    to={"/profile/select-seat"}
                    onClick={() => setSelectedUser(item.id)}
                  >
                    <Text className="text-sm text-gray-400">
                      {item.seat || "Select Seat"}
                    </Text>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-stretch">
          <Text className="font-medium">Return</Text>
          <div className="mt-3 flex h-full flex-col items-stretch rounded-lg px-3 py-4 shadow">
            <div className="flex justify-center">
              <Text className="text-3xl font-semibold">CGK</Text>
              <Image image={Arrow} alt="Arrow" className="mx-5 h-8" />
              <Text className="text-3xl font-semibold">YIA</Text>
            </div>
            <div className="my-3 h-px w-full bg-gray-200"></div>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <GarudaLogo className="w-6" />
                  <Text className="font-medium">GA207</Text>
                </div>
                <div className="inline-flex h-6 items-center justify-center rounded-full bg-gray-100 px-2">
                  <Text className="text-xs font-medium text-gray-500">
                    Non-stop
                  </Text>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-gray-400">
                Fri, 19 Jan <Dot className="h-4 w-4 text-black" />
                16:20 - 17:40
              </div>
            </div>
            <div className="mt-3 h-full gap-3">
              <div className="flex h-full items-center justify-between rounded-xl bg-gray-50 p-3">
                <Text className="text-center text-xs">
                  This flight does not allow you to select a seat, you will
                  automatically get a seat on your boarding pass
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={loading}
        type="button"
        variant={"primary"}
        className="mt-8 h-14 w-full rounded-xl"
        disabled={isLoading}
      >
        {isLoading && (
          <Spinner className="mr-1 h-5 w-5 animate-spin text-white" />
        )}
        Check-In
      </Button>
      <DialogBoardingPass />
    </>
  );
};

export default CheckInPage;
