import { AirplaneFill, Percentage, Receipt } from "@/assets/svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { List, Text } from "@mantine/core";
import { formatDistanceToNow } from "date-fns";
import FirstCarousel from "@/assets/carousel-1.png";
import { Image } from "@/components/ui/Image";
import { Copy } from "lucide-react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export interface Notif {
  type: "promo" | "flight" | "transaction";
  title: string;
  received_time: number;
  read: boolean;
}

interface props {
  data: Notif;
  handleClickNotif: () => void;
}

const Notification = ({ data, handleClickNotif }: props) => {
  const logo = {
    promo: <Percentage />,
    flight: <AirplaneFill />,
    transaction: <Receipt />,
  };
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const formattedTimeAgo = formatDistanceToNow(new Date(data.received_time), {
    addSuffix: true,
  });

  const Content = () => {
    return (
      <div className="text-xs font-normal">
        <Image
          className="w-[100%] md:w-[100%] lg:w-full"
          image={FirstCarousel}
          alt="Hero Background Vector"
        />
        <Text className="mb-4 mt-5 text-sm font-semibold">
          Unlock incredible savings on your air travel with our exclusive offer
        </Text>
        <p>
          Discount Extra Flight Ticket up to IDR 250K! Elevate your travel
          experience without breaking the bank. Enjoy the convenience of
          substantial discounts on your next flight, making your journey even
          more affordable. <br />
          <br />
          Seize the opportunity to explore new destinations, create lasting
          memories, and fly with extra savings. Hurry,{" "}
          <b>limited seats available.</b> Book now and soar to your dream
          destination with extra savings in your pocket!
        </p>
        <div className="mt-6 flex w-full flex-wrap rounded-lg border text-xs">
          <div className="w-1/2 border-b border-r p-2">
            <p>Promo Period</p>
            <p className="mt-2 font-semibold">24 - 30 Jan, 2024</p>
          </div>
          <div className="w-1/2 border-b p-2">
            <p>Minimum Transaction</p>
            <p className="mt-2 font-semibold">IDR 500,000</p>
          </div>
          <div className="w-1/2 border-r p-2">
            <p>Usage Period</p>
            <p className="mt-2 font-semibold">Anytime</p>
          </div>
          <div className="w-1/2 p-2">
            <p>Platform</p>
            <p className="mt-2 font-semibold">All Platform</p>
          </div>
        </div>
        <Text className="mb-3 mt-5 text-xs font-semibold">
          Copy the code below
        </Text>
        <div className="mb-3 flex justify-between rounded-lg bg-gray-100 p-2">
          <Text className="text-base font-medium">CPID82739SH</Text>
          <Copy className="text-primary-500" />
        </div>
        <Text className="mb-4 text-xs font-semibold">
          Terms and Conditions:
        </Text>
        <List type="ordered" className="list-decimal">
          <List.Item className="text-xs">
            The discount is only applicable to specified train routes and travel
            dates.
          </List.Item>
          <List.Item className="text-xs">
            This promo cannot be combined with any other promotions or
            discounts.
          </List.Item>
          <List.Item className="text-xs">
            The payment method accepted is only through credit card.
          </List.Item>
          <List.Item className="text-xs">
            Refund is calculated according to the total paid amount after the
            discount, not the initial price.
          </List.Item>
        </List>
      </div>
    );
  };

  if (!isDesktop) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <div
            className="flex cursor-pointer border-b py-6"
            onClick={handleClickNotif}
          >
            <div className="relative mr-4 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary-100 text-primary-500">
              {logo[data.type]}
              {!data.read && (
                <div className="absolute right-1 top-0 h-[9px] w-[9px] flex-auto rounded-full border-[2px] border-white bg-primary-500" />
              )}
            </div>
            <div>
              <Text className="font-medium">{data.title}</Text>
              <Text className="text-xs text-gray-400">{formattedTimeAgo}</Text>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh] w-full">
          <DrawerHeader>
            <DrawerTitle>Notification Detail</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-auto p-4">
            <Content />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex cursor-pointer border-b py-6"
          onClick={handleClickNotif}
        >
          <div className="relative mr-4 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary-100 text-primary-500">
            {logo[data.type]}
            {!data.read && (
              <div className="absolute right-1 top-0 h-[9px] w-[9px] flex-auto rounded-full border-[2px] border-white bg-primary-500" />
            )}
          </div>
          <div>
            <Text className="font-medium">{data.title}</Text>
            <Text className="text-xs text-gray-400">{formattedTimeAgo}</Text>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notification Detail</DialogTitle>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
};

export default Notification;
