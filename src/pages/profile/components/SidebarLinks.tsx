import { Airflight, Faq, Notification, Passenger } from "@/assets/svg";
import { CaretRight } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

const navData = [
  {
    icon: <Airflight />,
    title: "Flight Order",
    url: "/profile/order",
  },
  {
    icon: <Passenger />,
    title: "Save Passanger Data",
    url: "/profile/passenger-data",
  },
  {
    icon: <Notification />,
    title: "Notification Setting",
    url: "/profile/notification",
  },
  {
    icon: <Faq />,
    title: "Frequently Ask Question (FAQ)",
    url: "/profile/faq",
  },
];

const SidebarLinks = () => {
  return (
    <>
      {navData.map((item, index) => (
        <NavLink to={item.url} end key={index}>
          {({ isActive }) => (
            <div
              className={`${
                isActive
                  ? "border-b-primary-500 text-primary-500"
                  : "text-black"
              } relative flex items-center border-b py-5 text-xs hover:cursor-pointer`}
            >
              {item.icon}
              <p className="leading-1 ml-2 font-normal">{item.title}</p>
              <CaretRight className="ml-auto h-4 w-4" />
            </div>
          )}
        </NavLink>
      ))}
    </>
  );
};

export default SidebarLinks;
