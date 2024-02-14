import { MainLogo } from "@/assets/svg";
import { Text } from "@mantine/core";
import { Link } from "react-router-dom";

const NavUser = () => {
  return (
    <div className="pb-6">
      <div
        className={`md:h-18 flex h-24 w-full items-center justify-end bg-white px-6 md:px-9 lg:justify-between 
          lg:px-20`}
      >
        <div className="flex w-full items-center gap-10">
          <Link
            to="/"
            className="text-color3 flex w-96 flex-1 cursor-pointer items-center justify-start text-3xl font-medium md:text-5xl lg:text-4xl"
          >
            <MainLogo className="h-10 md:h-12" />
            <Text className="text-color3 pl-4 text-2xl font-normal md:text-5xl lg:text-4xl tracking-tighter">
              AeroSwift
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavUser;
