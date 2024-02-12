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
        className="flex items-center gap-3 py-2"
      >
        <Avatar>
          <AvatarImage src={userData?.imageUrl} alt="@shadcn" />
          <AvatarFallback>{initialName}</AvatarFallback>
        </Avatar>
        <div className="flex max-w-[170px] flex-col items-start justify-center">
          {userData?.fullName ? (
            <Text className="truncate text-lg font-semibold">
              {userData?.fullName}
            </Text>
          ) : (
            <Text className="text-lg font-semibold text-slate-500">
              Not Assigned
            </Text>
          )}
          {userData?.email && (
            <Text className="text-md font-normal text-slate-500">
              {userData?.email}
            </Text>
          )}
        </div>
      </Button>
    </Link>
  );
};

export default NavProfile;
