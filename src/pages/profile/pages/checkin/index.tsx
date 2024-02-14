import { Image } from "@/components/ui/Image";
import { Text } from "@mantine/core";
import { ArrowLeft, Spinner } from "@phosphor-icons/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Arrow from "@/assets/ArrowCircleRight.png";
import { Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckInStore } from "@/store/useCheckInStore";
import { useGetDetailUserBooking } from "@/lib/hooks/useProfileBooking";
import { TicketDetail } from "@/types/BookingUser";
import { format } from "date-fns";
import { useCheckInBooking } from "@/lib/hooks/useCheckIn";
import { useEffect } from "react";

const formatTime = (time: string) => {
  const date = new Date(time);
  const formattedTime = format(date, "hh:mm a");
  return formattedTime;
};

const formatDate = (time: string) => {
  const date = new Date(time);
  const formattedTime = format(date, "E, dd MMM yyyy");
  return formattedTime;
};

const CheckInPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isFetching } = useGetDetailUserBooking(id);
  const { userData, setUserData, setSelectedUser } = useCheckInStore();
  const { mutateAsync, isPending } = useCheckInBooking(id!);

  const handleCheckIn = async () => {
    await mutateAsync();
  };

  useEffect(() => {
    if (data) {
      const formatPass = data?.passengers.map((item) => ({
        id: item.passenger_id,
        nama: item.name,
        seat: item.seat ?? "",
      }));
      setUserData(formatPass);
      setSelectedUser(formatPass[0].id);
    }
  }, [data]);

  return (
    <>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
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
                Booking Code: {data?.booking_code}
              </Text>
            </div>
          </div>
          <div className="flex gap-8">
            {data?.tickets.map((ticket: TicketDetail, index: number) => {
              const flightRute = index === 0 ? "Depart" : "Return";
              const transit =
                ticket.flight.transit === 0 ? "Non-stop" : "Transit";

              return (
                <div
                  className="flex flex-1 flex-col items-stretch"
                  key={ticket.ticket_id}
                >
                  <Text className="font-medium">{flightRute}</Text>
                  <div className="mt-3 h-full rounded-lg px-3 py-4 shadow">
                    <div className="flex justify-center">
                      <Text className="text-3xl font-semibold">
                        {ticket.flight.departure.airport_details.city_iata_code}
                      </Text>
                      <Image image={Arrow} alt="Arrow" className="mx-5 h-8" />
                      <Text className="text-3xl font-semibold">
                        {ticket.flight.arrival.airport_details.city_iata_code}
                      </Text>
                    </div>
                    <div className="my-3 h-px w-full bg-gray-200"></div>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={ticket.flight.airline.image}
                            className="h-4"
                          />
                          <Text className="font-medium">
                            {ticket.flight.iata}
                          </Text>
                        </div>
                        <div className="inline-flex h-6 items-center justify-center rounded-full bg-gray-100 px-2">
                          <Text className="text-xs font-medium text-gray-500">
                            {transit}
                          </Text>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center text-xs font-medium text-gray-400">
                        {formatDate(ticket.flight.departure.scheduled_time)}
                        <Dot className="h-4 w-4 text-black" />
                        {formatTime(ticket.flight.departure.scheduled_time)}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-col gap-3">
                      {userData.map((item) => (
                        <div
                          className="flex justify-between rounded-xl bg-gray-50 p-3"
                          key={item.id}
                        >
                          <Text className="text-sm font-medium">
                            {item.nama}
                          </Text>
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
              );
            })}
          </div>
          <Button
            onClick={handleCheckIn}
            type="button"
            variant={"primary"}
            className="mt-8 h-14 w-full rounded-xl"
            disabled={isPending}
          >
            {isPending && (
              <Spinner className="mr-1 h-5 w-5 animate-spin text-white" />
            )}
            Check-In
          </Button>
        </>
      )}
    </>
  );
};

export default CheckInPage;
