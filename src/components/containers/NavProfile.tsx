import { useRef, useEffect } from "react";
import { Text } from "@mantine/core";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useNav from "@/lib/hooks/useNav";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DoorOpen } from "@phosphor-icons/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch"
import { BellIcon } from "@radix-ui/react-icons"
 
const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]


type CardProps = React.ComponentProps<typeof Card>

const NavProfile = ({ className, ...props }: CardProps) => {
  const {
    userData,
    handleLogout,
    getInitials,
    fetchUserData,
  } = useNav();

  const ref = useRef(null);

  const initialName = userData ? getInitials(userData?.fullName) : "NA";

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" ref={ref} className="flex items-center gap-3">
          <Avatar className="z-10">
            <AvatarImage src={userData?.imageUrl} alt="@shadcn" />
            <AvatarFallback>{initialName}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <Text className="text-lg font-semibold">{userData?.fullName}</Text>
            <Text className="text-md font-normal text-slate-500">
              {userData?.email_address}
            </Text>
          </div>
          <ChevronDownIcon fontSize={48} className="text-primary-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Card className={cn("w-96", className)} {...props}>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center rounded-md border p-4">
              <BellIcon />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Push Notifications
                </p>
                <p className="text-muted-foreground text-sm">
                  Send notifications to device.
                </p>
              </div>
              <Switch />
            </div>
            <div>
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogout} className="w-full">
              <DoorOpen className="mr-2 h-6 w-6" /> Sign Out
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NavProfile;
