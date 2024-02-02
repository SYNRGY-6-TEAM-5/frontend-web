import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import useNav from "@/lib/hooks/useNav";
import { Logout } from "@/assets/svg";
import { Text } from "@mantine/core";

const LogoutButton = () => {
  const { handleLogout } = useNav();

  return (
    <Dialog>
      <DialogTrigger className="my-6 h-14 w-full rounded bg-primary-50 text-xs font-medium text-primary-500 hover:bg-red-500 hover:text-white">
        <span className="flex items-center justify-center ">
          <Logout className="mr-1" /> Log Out
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Logout Confirmation</DialogTitle>
          <DialogDescription>
            <Text className="my-11 text-center font-medium tracking-tighter text-black">
              Are you sure want to log out?
            </Text>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button className="h-14 w-full rounded-xl bg-primary-50 text-xs font-medium text-primary-500 hover:bg-gray-50 hover:text-black">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                className="h-14 w-full rounded-xl bg-primary-500 text-xs font-medium text-white hover:bg-red-500"
                type="button"
                onClick={handleLogout}
              >
                Yes
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutButton;
