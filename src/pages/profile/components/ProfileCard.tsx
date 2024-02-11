import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditPencil } from "@/assets/svg";
import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { useProfileUserStore } from "@/store/useProfileUserStore";
import { useEffect, useState } from "react";

const ProfileCard = () => {
  const [userEmail, setUserEmail] = useState<string | undefined>("")

  const { userData } = useProfileUserStore();

  useEffect(() => {
    if (userData) {
      setUserEmail(userData.email);
    }
  }, [userData]);

  console.log(userEmail);

  return (
    <div className="flex items-center rounded-xl bg-black px-3 py-4">
      <Avatar className="z-10 h-14 w-14">
        <AvatarImage src={userData?.imageUrl} className="object-cover" />
        <AvatarFallback>{"NA"}</AvatarFallback>
      </Avatar>
      {userEmail !== "" && (
        <div className="ml-2 max-w-[225px]">
          <Text className="mb-0.5 truncate text-sm font-semibold text-white">
            {userData?.fullName ?? "Not Assigned"}
          </Text>
          <Text className="text-xs text-white">
            {userEmail}
          </Text>
        </div>
      )}
      <Link to="/profile/edit" className="ml-auto">
        <EditPencil />
      </Link>
    </div>
  );
};

export default ProfileCard;
