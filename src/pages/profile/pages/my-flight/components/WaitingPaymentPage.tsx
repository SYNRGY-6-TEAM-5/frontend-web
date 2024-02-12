import TimerMyFlight from "./ui/TimerMyFlight";
import useTimer from "@/lib/hooks/useTimer";
import DetailRuteOrder from "./containers/DetailRuteOrder";
import PassangerDetails from "./containers/PassangerDetails";
import { Button } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useGetDetailUserBooking } from "@/lib/hooks/useProfileBooking";
import { useEffect, useState } from "react";
import HeaderDetailBooking from "./ui/HeaderDetailBooking";
import CodeBooking from "./containers/CodeBooking";
import DetailRuteSuccess from "./containers/DetailRuteSuccess";

const WaitingPayment = () => {
  const { id } = useParams();
  const { data: dataBooking, isFetching } = useGetDetailUserBooking(id);
  const [time, setTime] = useState(0);

  const date = new Date().getTime();
  const { seconds, minutes, hours } = useTimer({ date, countDownTime: time });

  useEffect(() => {
    if (dataBooking) {
      const expiredSecond = new Date(dataBooking.expired_time).getTime();
      const countDownTime = expiredSecond - date;
      setTime(countDownTime);
      console.log(dataBooking?.expired_time);
    }
  }, [dataBooking]);

  if (!dataBooking) {
    return <div>Loading...</div>;
  }

  return !isFetching ? (
    <section id="waitingPayment" className="mb-8">
      <HeaderDetailBooking
        booking_id={dataBooking.booking_id}
        status={dataBooking.status}
        airlane={dataBooking.tickets[0].flight.airline.name}
        iata={dataBooking.tickets[0].flight.iata}
        ticket_type={dataBooking.tickets[0].ticket_type}
      />
      <div className="flex flex-col gap-8">
        {!(dataBooking.status === "SUCCESS") ? (
          <>
            <CodeBooking
              bookingCode={dataBooking.booking_code || ""}
              depart={
                dataBooking.tickets[0].flight.departure.airport_details
                  .city_iata_code
              }
              arive={
                dataBooking.tickets[0].flight.arrival.airport_details
                  .city_iata_code
              }
              passanger={dataBooking.passengers}
            />
            <DetailRuteSuccess BookingUser={dataBooking} />
          </>
        ) : (
          <>
            <TimerMyFlight hours={hours} minutes={minutes} seconds={seconds} />
            <DetailRuteOrder BookingUser={dataBooking} />
          </>
        )}

        <PassangerDetails
          Booking={dataBooking}
          Passangers={dataBooking.passengers}
          Tickets={dataBooking.tickets}
        />
        <Button
          type="button"
          className="h-14 w-full rounded-xl bg-primary-500 py-4 text-sm font-medium text-white"
        >
          Complete the Payment in {hours}:{minutes}:{seconds}
        </Button>
      </div>
    </section>
  ) : (
    <>
      <div>Loading...</div>
    </>
  );
};

export default WaitingPayment;
