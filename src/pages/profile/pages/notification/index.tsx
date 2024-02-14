import { Switch } from "@/components/ui/switch";
import { Text } from "@mantine/core";
import { Bell } from "@phosphor-icons/react";
import PopoverRead from "./components/Popover";
import ListNotification from "./components/ListNotification";
import DataNotif from "./components/DataNotif";
import { useEffect } from "react";
import { useNotificationStore } from "@/store/useNotificationStore";
import { format } from "date-fns";

const Notification = () => {
  const { setNotifData } = useNotificationStore();

  useEffect(() => {
    setNotifData(DataNotif);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="ml-auto flex w-[250px] items-center rounded-xl bg-gray-100 p-6 text-sm font-medium">
        <Bell size={24} className="mr-2" />
        Notifications
        <Switch className="ml-auto data-[state=checked]:bg-primary-500" />
      </div>
      <div className="my-7 rounded-xl bg-white px-3 py-6">
        <div className="flex justify-between">
          <Text className="text-sm font-medium text-gray-400">
            Today, {format(new Date(), "dd MMM yyyy")}
          </Text>
          <PopoverRead />
        </div>
        <ListNotification />
      </div>
    </>
  );
};

export default Notification;
