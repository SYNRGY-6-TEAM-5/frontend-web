import Notification, { Notif } from "./Notification";
import { useNotificationStore } from "@/store/useNotificationStore";

const ListNotification = () => {
  const { notifData, setNotifData } = useNotificationStore();

  const handleNotificationClick = (index: number) => {
    const updatedNotifications = [...notifData];
    updatedNotifications[index] = {
      ...updatedNotifications[index],
      read: true,
    };
    setNotifData(updatedNotifications);
  };

  return (
    <div className="mt-4">
      {notifData.map((item: Notif, index) => (
        <Notification
          data={item}
          key={index}
          handleClickNotif={() => handleNotificationClick(index)}
        />
      ))}
    </div>
  );
};

export default ListNotification;
