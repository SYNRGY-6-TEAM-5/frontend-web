import TimerMyFlight from "./ui/TimerMyFlight";
import useParseTime from "@/lib/hooks/useTimer";
import DetailRuteOrder from "./containers/DetailRuteOrder";
import PassangerDetails from "./containers/PassangerDetails";
import { Button } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDetailUserBooking } from "@/lib/hooks/useProfileBooking";
import { useEffect, useState } from "react";
import HeaderDetailBooking from "./ui/HeaderDetailBooking";
import CodeBooking from "./containers/CodeBooking";
import DetailRuteSuccess from "./containers/DetailRuteSuccess";
import useNav from "@/lib/hooks/useNav";
import { data } from "@/components/particles/BookingData";
import { differenceInSeconds, isFuture } from "date-fns";
import useTimer from "easytimer-react-hook";

const WaitingPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [time, setTime] = useState(0);
  const [count_down, setCountDown] = useState<number>(0);
  const [isRunOut, setIsRunOut] = useState<boolean>(false);

  const { data: dataBooking, isFetching } = useGetDetailUserBooking(id);
  const { userData } = useNav();
  const [timer] = useTimer({ countdown: true });

  const { seconds, minutes, hours } = useParseTime({
    countDownTime: count_down,
  });

  const handlePay = () => {
    if (userData) {
      navigate(`/user/payment/${userData.id}/${dataBooking?.booking_id}`);
    } else {
      console.log(userData);
    }
  };

  useEffect(() => {
    const expiryTime = dataBooking?.expired_time;
    const currentTime = new Date();

    if (expiryTime && isFuture(new Date(expiryTime))) {
      setCountDown(differenceInSeconds(new Date(expiryTime), currentTime));
      setIsRunOut(false);
    } else {
      setIsRunOut(true);
    }

    timer.start({
      countdown: true,
      startValues: { hours, minutes, seconds },
    });
  }, [data, seconds, minutes, hours]);

  const date = new Date().getTime();

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
            <TimerMyFlight timeValues={timer.getTimeValues()} />
            <DetailRuteOrder BookingUser={dataBooking} />
          </>
        )}

        <PassangerDetails
          Booking={dataBooking}
          Passangers={dataBooking.passengers}
          Tickets={dataBooking.tickets}
        />
        {!isRunOut && (
          <Button
            type="button"
            className="h-14 w-full rounded-xl bg-primary-500 py-4 text-sm font-medium text-white"
            onClick={handlePay}
          >
            Complete the Payment in {hours}:{minutes}:{seconds}
          </Button>
        )}
      </div>
    </section>
  ) : (
    <>
      <div>Loading...</div>
    </>
  );
};

export default WaitingPayment;
