import { Card, CardHeader } from "@/components/ui/card";
import { ArrowCircleRight, EatLogo, GarudaLogo, WorkLogo } from "@/assets/svg";
import { Text } from "@mantine/core";

interface DepartureArrival {
  code: string;
  time: string;
}

interface BookingSectionProps {
  title: string;
  flightNumber: string;
  departure: DepartureArrival;
  arrival: DepartureArrival;
  price: string;
}

const BookingSection: React.FC<BookingSectionProps> = ({
  title,
  flightNumber,
  departure,
  arrival,
  price,
}) => {
  return (
    <div className="flex h-[334px] flex-col items-start justify-start gap-3 bg-white px-4 py-6">
      <div className="inline-flex items-center justify-between self-stretch p-2">
        <Text className="text-2xl font-normal text-black">{title}</Text>
        <div className="flex items-center justify-center gap-2">
          <div className="relative h-[22px] w-12">
            <div className="absolute left-0 top-[-0px] h-[22px] w-12">
              <GarudaLogo />
            </div>
          </div>
          <Text className="text-2xl font-medium">{flightNumber}</Text>
        </div>
      </div>
      <div className="flex h-[226px] flex-col items-start justify-center gap-6 self-stretch">
        <div className="inline-flex items-center justify-between self-stretch rounded-2xl bg-neutral-900 p-3">
          <div className="inline-flex flex-col items-end justify-center gap-1">
            <Text className="text-3xl font-semibold text-white">
              {departure.code}
            </Text>
            <Text className="text-sm font-medium text-slate-300">
              {departure.time}
            </Text>
          </div>
          <div className="inline-flex h-[92px] flex-col items-center justify-between">
            <Text className="text-center text-sm font-semibold text-white">
              1h 2m
            </Text>
            <div className="inline-flex w-[136px] items-center justify-start gap-1">
              <div className="h-[0px] shrink grow basis-0 border border-zinc-200"></div>
              <div className="relative h-8 w-8">
                <ArrowCircleRight />
              </div>
              <div className="h-[0px] shrink grow basis-0 border border-zinc-200"></div>
            </div>
            <div className="inline-flex h-6 items-center justify-start gap-2.5 rounded-[33px] bg-white px-2">
              <Text className="text-xs font-medium">Non-stop</Text>
            </div>
          </div>
          <div className="inline-flex flex-col items-start justify-start gap-1">
            <Text className="text-3xl font-semibold  text-white">
              {arrival.code}
            </Text>
            <Text className="text-sm font-medium text-slate-300">
              {arrival.time}
            </Text>
          </div>
        </div>
        <div className="inline-flex items-center justify-between self-stretch">
          <div className="flex items-center justify-start gap-3 pr-4">
            <EatLogo />
            <WorkLogo />
          </div>
          <div className="flex items-center justify-start gap-2">
            <Text className="font-normal">Excess baggage (+)</Text>
            <Text className="text-right font-medium">IDR 25,000/kg</Text>
          </div>
        </div>
        <div className="inline-flex items-start justify-end gap-1">
          <Text className="text-xl font-medium text-primary-500">{price}</Text>
          <Text className="text-xl font-normal text-slate-500">/pax</Text>
        </div>
      </div>
    </div>
  );
};

const BookingDetail = () => {
  return (
    <Card>
      <CardHeader>
        <BookingSection
          title="Depart"
          flightNumber="GA207"
          departure={{ code: "YIA", time: "06:25 AM" }}
          arrival={{ code: "CGK", time: "07:40 AM" }}
          price="IDR 1,165,450"
        />
        <BookingSection
          title="Return"
          flightNumber="GA207"
          departure={{ code: "CGK", time: "07:40 AM" }}
          arrival={{ code: "YIA", time: "06:25 AM" }}
          price="IDR 1,165,450"
        />
        {/* ... Additional sections */}
        <div className="flex h-16 flex-col items-center justify-between self-stretch border-t border-zinc-200 px-3 py-5">
          <div className="inline-flex items-center justify-between self-stretch">
            <div className="flex items-center justify-start gap-1">
              <Text className="text-lg font-medium">Total</Text>
              <div className="relative h-5 w-5"></div>
            </div>
            <Text className="text-2xl font-medium text-primary-500">
              IDR 2,230,900
            </Text>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default BookingDetail;
