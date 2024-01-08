import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavButtons, NavLinks } from "../particles/DataLists";
import { List } from "@/components/ui/List";
import { Logo } from "@/assets/svg";
import { Text } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowCircleRight, CirclesFour } from "@phosphor-icons/react";
import { Slide } from "react-awesome-reveal";

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
    <header className="bg-transparent fixed left-0 top-0 z-50 h-auto w-full overflow-x-hidden">
      <Slide direction="down">
        <nav
          className={`md:h-18 flex h-24 w-full items-center justify-end px-6 md:px-9 lg:justify-between lg:px-20 ${
            navBarColor ? "bg-white" : "bg-transparent"
          }`}
        >
          <div className="hidden w-full items-center gap-10 lg:flex">
            <div className="text-color3 flex w-96 flex-1 items-center justify-start text-3xl font-medium md:text-5xl lg:text-4xl">
              <Logo className="h-10 md:h-12" alt="Logo" />
              <Text className="text-color3 pl-4 text-2xl font-normal md:text-5xl lg:text-4xl">
                AeroSwift
              </Text>
            </div>

            <ul className="flex items-center justify-end gap-8">
              {NavLinks.map((navlink, index) => (
                <List className="w-full text-base" key={index}>
                  <NavLink
                    to={navlink.url}
                    className="before:bg-color2 after:bg-color2 hover:text-primary relative inline-block overflow-hidden pl-2 pt-2 font-sans font-medium text-primary-500 before:absolute before:-left-10 before:top-2 before:h-2 before:w-2 before:rounded-full before:transition-all before:duration-200 before:ease-in after:absolute after:-top-10 after:left-1 after:h-3 after:w-0.5 after:transition-all after:duration-200 after:ease-in hover:before:left-0.5 hover:after:top-3.5"
                  >
                    {navlink.name}
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
                      relative z-10 px-8 py-2
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
              className="hamburger text-gray-950 cursor-pointer"
              onClick={handleToggle}
            >
              <CirclesFour size={30} color="currentColor" weight="fill" />
            </div>
          </div>
        </nav>
      </Slide>

      {/* Mobile Nav  */}
      <nav
        className={`bg-gray-950/90 fixed top-0 flex h-screen w-full justify-end lg:hidden  ${
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
                className="hamburger text-gray-950 cursor-pointer"
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
                      ? "border-gray-950 border-2 before:top-0"
                      : "hover:border-gray-950 border-b-2 border-white before:bottom-0"
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
