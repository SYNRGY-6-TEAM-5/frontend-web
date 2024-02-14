import { MainLogo } from "@/assets/svg";
import { Text } from "@mantine/core";

const BookingNavbar = () => {
  return (
    <div className="bg-white py-7 md:text-5xl lg:text-4xl">
      <div className="container flex items-center justify-start">
        <MainLogo className="h-10" />
        <Text className="pl-4 text-2xl font-medium leading-tight tracking-tighter md:text-5xl lg:text-4xl">
          Aero Swift
        </Text>
      </div>
    </div>
  );
};

export default BookingNavbar;
