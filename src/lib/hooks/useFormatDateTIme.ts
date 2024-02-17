import { format } from "date-fns";

const useFormatDateTime = () => {
  const formatTime = (time: string) => {
    const date = new Date(time);
    const formattedTime = format(date, "hh:mm a");
    return formattedTime;
  };

  const formatDate = (time: string) => {
    const date = new Date(time);
    const formattedTime = format(date, "E, dd MMM yyyy ");
    return formattedTime;
  };

  const formatDateTime = (time: string) => {
    const date = new Date(time);
    const formattedTime = format(date, "d MMM, HH:mm");
    return formattedTime;
  };

  return{
    formatTime,
    formatDate,
    formatDateTime
  }
}

export default useFormatDateTime;