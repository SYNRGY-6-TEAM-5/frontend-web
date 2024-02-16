import { useRef, useEffect } from "react";
import { Text } from "@mantine/core";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useNav from "@/lib/hooks/useNav";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const NavProfile = () => {
  const { userData, getInitials, fetchUserData } = useNav();

  const ref = useRef(null);

  const initialName = userData ? getInitials(userData?.fullName) : "NA";

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Link to="/profile">
      <Button
        variant="ghost"
        ref={ref}
        className="flex items-center gap-3 px-0 py-0 lg:px-4"
      >
        <Avatar>
          <AvatarImage
            src={userData?.imageUrl}
            alt="@shadcn"
            className="object-cover"
          />
          <AvatarFallback>{initialName}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center">
          {userData?.fullName ? (
            <Text className="max-w-[170px] truncate text-sm font-semibold lg:text-lg">
              {userData?.fullName}
            </Text>
          ) : (
            <Text className="text-lg font-semibold text-slate-500">
              Not Assigned
            </Text>
          )}
          {userData?.email && (
            <Text className="lg:text-md max-w-[170px] truncate text-sm font-normal text-slate-500">
              {userData?.email}
            </Text>
          )}
        </div>
      </Button>
    </Link>
  );
};

export default NavProfile;
