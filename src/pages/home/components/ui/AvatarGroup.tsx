import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FirstAvatar from "../../../../assets/avatar-1.png";
import SecondAvatar from "../../../../assets/avatar-2.png";
import ThirdAvatar from "../../../../assets/avatar-3.png";

const AvatarGroup = () => {
  return (
    <div className="flex flex-row items-center">
      <Avatar className="z-10">
        <AvatarImage src={FirstAvatar} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2">
        <AvatarImage src={SecondAvatar} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2">
        <AvatarImage src={ThirdAvatar} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarGroup;
