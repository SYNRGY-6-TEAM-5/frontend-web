import { MainLogo } from "@/assets/svg";
import { Text } from "@mantine/core";
import { Slide } from "react-awesome-reveal";


const NavUser = () => {

  return (
    <header className="fixed left-0 top-0 z-50 h-auto w-full overflow-x-hidden bg-transparent">
      <Slide direction="down">
        <nav
          className={`md:h-18 flex h-24 w-full items-center justify-end px-6 md:px-9 lg:justify-between lg:px-20 
            bg-white`}
        >
          <div className="hidden w-full items-center gap-10 lg:flex">
            <div className="text-color3 flex w-96 flex-1 items-center justify-start text-3xl font-medium md:text-5xl lg:text-4xl">
              <MainLogo className="h-10 md:h-12" />
              <Text className="text-color3 pl-4 text-2xl font-normal md:text-5xl lg:text-4xl">
                AeroSwift
              </Text>
            </div>
          </div>
        </nav>
      </Slide>
    </header>
  );
};

export default NavUser;
