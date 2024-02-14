import { ToastActionElement, ToastProps } from "@/components/ui/toast";
import { ApiError } from "@/types/ApiError";

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

type Toast = Omit<ToasterToast, "id">;

export const handleApiError = (
  error: ApiError,
  toast: ({ ...props }: Toast) => void,
) => {
  if (error.response?.data.message) {
    toast({
      variant: "destructive",
      title: error.response.data.message,
    });
  } else {
    toast({
      variant: "destructive",
      title: "Service error! Please try again.",
    });
  }
};

export const handleUpdateApiSuccess = (
  message: string,
  toast: ({ ...props }: Toast) => void,
) => {
  toast({
    variant: "success",
    title: message,
  });
};
