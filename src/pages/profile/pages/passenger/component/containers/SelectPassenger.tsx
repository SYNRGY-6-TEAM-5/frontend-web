import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { useListPassenger } from "@/lib/hooks/usePassengerTravel";
import { useProfileUserStore } from "@/store/useProfileUserStore";
import { ISavedPassengerData } from "@/types/Booking";
import SelectHeader from "../ui/SelectHeader";
import SelectItem from "../ui/SelectItem";
import { useSavedPassengerStore } from "@/store/usePassengerStore";

const SelectPassenger = () => {
  const [savedPassenger, setSavedPassenger] = useState<ISavedPassengerData[]>([]);
  const { data, error, isFetching } = useListPassenger();
  const { userData } = useProfileUserStore();

  const { setSelectedPassengerId, setIsAddingPassenger } = useSavedPassengerStore();

  useEffect(() => {
    if (data && userData) {
      setSavedPassenger(data);
    }
  }, [data, userData, savedPassenger]);

  if (isFetching) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-10 items-end">
      <Card className="w-full">
        <CardHeader>
          <SelectHeader />
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 px-8 pb-12">
          {savedPassenger.map((passengerData: ISavedPassengerData, index: number) => (
            <Button key={index} variant="ghost" className="w-full" onClick={() => setSelectedPassengerId(passengerData.saved_passenger_id)}>
              <SelectItem name={passengerData.name} user_name={userData?.fullName ? userData.fullName : "NA"} index={index} />
            </Button>
          ))}
        </CardContent>
      </Card>
      <Button
      onClick={() => setIsAddingPassenger(true)}
        variant="primary"
        className="h-10 w-56"
      >
        Add Passenger Data
      </Button>
    </div>
  );
};

export default SelectPassenger;
