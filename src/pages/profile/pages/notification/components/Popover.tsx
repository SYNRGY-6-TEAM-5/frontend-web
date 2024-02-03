import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNotificationStore } from "@/store/useNotificationStore";
import { DotsThreeCircle } from "@phosphor-icons/react";

const PopoverRead = () => {
  const { notifData, setNotifData } = useNotificationStore();

  const handleReadAll = () => {
    const updatedNotifications = notifData.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifData(updatedNotifications);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <DotsThreeCircle size={24} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0" align="end">
        <Button variant="link" onClick={handleReadAll} type="button">
          Mark all read
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverRead;
