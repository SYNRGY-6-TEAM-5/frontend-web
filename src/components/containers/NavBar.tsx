import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavButtons, NavLinks } from "../particles/DataLists";
import { List } from "@/components/ui/List";
import { MainLogo } from "@/assets/svg";
import { Text } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowCircleRight, CirclesFour } from "@phosphor-icons/react";
import { Slide } from "react-awesome-reveal";

import { ChevronDown } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  // const [scrollY, setScrollY] = useState(0)
  const [navBarColor, setNavBarColor] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const listenScrollEvent = () => {
    window.scrollY > 10 ? setNavBarColor(true) : setNavBarColor(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 h-auto w-full overflow-x-hidden bg-transparent">
      <Slide direction="down">
        <nav
          className={`md:h-18 flex h-24 w-full items-center justify-end px-6 md:px-9 lg:justify-between lg:px-20 ${
            navBarColor ? "bg-white" : "bg-transparent"
          }`}
        >
          <div className="hidden w-full items-center gap-10 lg:flex">
            <div className="text-color3 flex w-96 flex-1 items-center justify-start text-3xl font-medium md:text-5xl lg:text-4xl">
              <MainLogo className="h-10 md:h-12" />
              <Text className="text-color3 pl-4 text-2xl font-normal md:text-5xl lg:text-4xl">
                AeroSwift
              </Text>
            </div>

            <ul className="flex items-center justify-end gap-8">
              {NavLinks.map((navlink, index) => (
                <List className="w-full text-base" key={index}>
                  <NavLink
                    to={navlink.url}
                    className="flex flex-row gap-[2px] items-center overflow-hidden pl-2 pt-2 font-normal tracking-wide text-zinc-900 before:absolute before:-left-10 before:top-2 before:h-2 before:w-2 before:rounded-full before:transition-all before:duration-200 before:ease-in after:absolute after:-top-10 after:left-1 after:h-3 after:w-0.5 after:transition-all after:duration-200 after:ease-in hover:text-primary-500 hover:before:left-0.5 hover:after:top-3.5"
                  >
                    {navlink.name}

                    <ChevronDown
                      size={20}
                      className="font-base text-primary-500"
                    />
                  </NavLink>
                </List>
              ))}
            </ul>

            <ul className="flex items-center justify-end gap-6">
              {NavButtons.map((navbutton, index) => (
                <List className="w-full" key={index}>
                  <Button
                    onClick={() => navigate(navbutton.url)}
                    type="button"
                    variant={`${
                      navbutton.name === "Login" ? "black" : "transparent"
                    }`}
                    className={`
                      text-md font-normal tracking-wide  relative z-10 px-8 py-2
                      before:absolute before:left-0 before:-z-10 before:h-0 before:w-full
                      before:transition-all before:duration-300 before:ease-in before:content-[''] 
                      hover:before:h-full
                      ${
                        navbutton.name !== "Login" ? "text-black" : "text-white"
                      }`}
                  >
                    {navbutton.name}
                  </Button>
                </List>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4 lg:hidden">
            <div
              className="hamburger cursor-pointer text-gray-950"
              onClick={handleToggle}
            >
              <CirclesFour size={30} color="currentColor" weight="fill" />
            </div>
          </div>
        </nav>
      </Slide>

      {/* Mobile Nav  */}
      <nav
        className={`fixed top-0 flex h-screen w-full justify-end bg-gray-950/90 lg:hidden  ${
          open ? "right-0" : "-right-[120vw]"
        } transition-all duration-500 ease-out`}
      >
        <div
          className={`relative flex h-screen w-[70%] flex-col items-center justify-between bg-white ${
            open ? "right-0" : "-right-[120vw]"
          } transition-all delay-300 duration-500 ease-out`}
        >
          <section className="flex w-full flex-col gap-16 px-4 py-6">
            <div className="flex w-full items-center justify-between">
              <Text className=" text-color3 text-3xl font-medium md:text-5xl lg:text-4xl">
                AeroSwift
              </Text>
              <div
                className="hamburger cursor-pointer text-gray-950"
                onClick={handleToggle}
              >
                <ArrowCircleRight
                  size={25}
                  color="currentColor"
                  weight="fill"
                />
              </div>
            </div>
            <ul className="flex flex-col gap-3 pl-2">
              {NavLinks.map((navlink, index) => (
                <List className="w-full text-base" key={index}>
                  <NavLink
                    to={navlink.url}
                    onClick={handleToggle}
                    className={`before:bg-color2 relative inline-block overflow-hidden before:absolute before:-left-full before:bottom-0 before:h-0.5 before:w-full before:rounded-full before:transition-all before:duration-200 before:ease-in hover:before:left-0 `}
                  >
                    {navlink.name}
                  </NavLink>
                </List>
              ))}
            </ul>
          </section>
          <ul className="flex w-full items-center justify-end gap-4 pb-24">
            {NavButtons.map((navbutton, index) => (
              <List className="w-auto" key={index}>
                <Button
                  onClick={() => navigate(navbutton.url)}
                  type="button"
                  className={`${
                    navbutton.name === "Signup"
                      ? "border-2 border-gray-950 before:top-0"
                      : "border-b-2 border-white before:bottom-0 hover:border-gray-950"
                  } before:bg-color2 relative z-10 px-5 py-1.5 text-base before:absolute before:left-0 before:-z-10 before:h-0 before:w-full before:transition-all before:duration-300 before:ease-in before:content-[''] hover:before:h-full`}
                >
                  {navbutton.name}
                </Button>
              </List>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
