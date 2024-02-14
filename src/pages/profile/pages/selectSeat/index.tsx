import { Seat } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCheckInStore } from "@/store/useCheckInStore";
import { SeatData } from "@/types/CheckIn";
import { Text } from "@mantine/core";
import { ArrowLeft } from "@phosphor-icons/react";
import clsx from "clsx";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const getLabel = (num: number): string => {
  const alphabet = String.fromCharCode(65 + Math.floor((num - 1) % 6));
  const labelNumber = Math.floor((num - 1) / 6) + 1;
  return `${labelNumber}${alphabet}`;
};

const chunkArray = (arr: number[], chunkSize: number): number[][] => {
  const result: number[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

const SeatSelector: React.FC = () => {
  const numbers = Array.from({ length: 140 }, (_, index) => index + 1);
  const column = 6;
  const navigate = useNavigate();
  const { userData, selectedUser, setSelectedUser, setChangeSeat } =
    useCheckInStore();

  const [seats] = useState<SeatData[][]>(() =>
    chunkArray(numbers, column).map((group) =>
      group.map((num) => ({
        id: getLabel(num),
        isOccupied: Math.random() < 0.2,
      })),
    ),
  );

  const toggleSeatSelection = (seatId: string | null) => {
    if (seatId === null) return;

    const row = seats.findIndex(
      (row) => row.findIndex((seat) => seat.id === seatId) !== -1,
    );
    const col = seats[row].findIndex((seat) => seat.id === seatId);

    if (row === -1 || col === -1) return;

    setChangeSeat(seatId);
  };

  const numberToAlphabet = (num: number): string => {
    return String.fromCharCode(65 + num);
  };

  const isSeatSelected = (seatId: string) =>
    userData.some((item) => item.seat === seatId);

  const isSeatSelectedUser = (seatId: string) => {
    return seatId === userData.find((user) => user.id === selectedUser)?.seat;
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
          <Text className="font-medium">Select Seat</Text>
          <Text className="mt-1 text-xs font-normal text-gray-400">
            Order ID:
          </Text>
        </div>
      </div>
      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center">
          <Seat className="h-9 w-9   text-primary-500" />
          <Text className="ml-2 text-xs font-medium">Selected</Text>
          <Seat className="ml-5 h-9 w-9 text-gray-200" />
          <Text className="ml-2 text-xs font-medium">Available</Text>
          <Seat className="ml-5 h-9 w-9 text-black" />
          <Text className="ml-2 text-xs font-medium">Unavailable</Text>
        </div>
        <div className="w-1/2">
          <div className="mb-8 mt-4 w-full rounded-lg bg-black py-1 text-center font-medium text-white">
            KOKPIT
          </div>
          <div className="mb-3 flex items-center justify-center gap-5">
            {Array.from({ length: column }).map((_, index) => (
              <>
                <div
                  className="w-9 text-center text-xs font-medium"
                  key={index}
                >
                  {numberToAlphabet(index)}
                </div>
                {(index + 1) % 3 === 0 && (
                  <div className="w-9 last:hidden"></div>
                )}
              </>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            {seats.map((item, seatNum) => (
              <div
                className="flex items-center justify-center gap-5"
                key={seatNum}
              >
                {item.map((seat, index) => (
                  <>
                    <Button
                      type="button"
                      variant={"link"}
                      key={seat.id}
                      onClick={() => toggleSeatSelection(seat.id)}
                      className="p-0"
                      disabled={seat.isOccupied || isSeatSelected(seat.id!)}
                    >
                      <Seat
                        className={clsx("h-9 w-9 cursor-not-allowed", {
                          "text-primary-500":
                            isSeatSelected(seat.id!) &&
                            isSeatSelectedUser(seat.id!),
                          "text-primary-200":
                            isSeatSelected(seat.id!) &&
                            !isSeatSelectedUser(seat.id!),
                          "text-black": seat.isOccupied,
                          "cursor-pointer text-gray-200":
                            !isSeatSelected(seat.id!) && !seat.isOccupied,
                        })}
                      />
                    </Button>
                    {(index + 1) % Math.floor(item.length / (column / 3)) ===
                      0 && (
                      <div className="w-9 text-center text-xs font-medium text-primary-500 last:hidden">
                        {seatNum + 1}
                      </div>
                    )}
                  </>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 mb-8 flex gap-3 rounded-2xl bg-white p-5 shadow-sm">
        {userData.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedUser(item.id)}
            className={cn(
              "flex-1 cursor-pointer rounded-xl border border-gray-100 bg-gray-50 p-3 text-center text-sm font-medium",
              selectedUser === item.id &&
                "border-primary-500 bg-primary-50 text-primary-500",
            )}
          >
            {item.nama} - {item.seat}
          </div>
        ))}
        <Button
          type="button"
          variant={"primary"}
          className="h-full p-3"
          onClick={() => {
            navigate(-1);
          }}
        >
          <Pencil className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
};

export default SeatSelector;
