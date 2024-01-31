import CopyrightSearch from "@/components/containers/Copyright";
import FooterSearch from "@/components/containers/Footer";
import NavBar from "@/components/containers/NavBar";
import { Button } from "@/components/ui/button";
import SidebarLinks from "./components/SidebarLinks";
import { Link, Outlet } from "react-router-dom";
import { Logout } from "@/assets/svg";
import ProfileCard from "./components/ProfileCard";
import useNav from "@/lib/hooks/useNav";

const Profile = () => {
  const { handleLogout } = useNav();

  return (
    <>
      <NavBar />
      <div className="relative mt-24 flex min-h-screen bg-[#FBFBFB] px-6 md:px-9 lg:justify-between lg:px-20 ">
        <div className="my-8 mr-20 w-[343px]">
          <div className="sticky top-32 rounded-xl bg-white shadow-sm">
            <ProfileCard />
            <div className="px-3">
              <Link to="/profile">
                <Button
                  variant={"primary"}
                  className="my-6 h-14 w-full rounded text-xs font-medium"
                >
                  My Flight
                </Button>
              </Link>
              <SidebarLinks />
              <Button
                className="my-6 h-14 w-full rounded bg-primary-50 text-xs font-medium text-primary-500 hover:bg-red-500 hover:text-white"
                type="button"
                onClick={handleLogout}
              >
                <Logout className="mr-1" /> Log Out
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 grow">
          <Outlet />
        </div>
      </div>
      <FooterSearch />
      <CopyrightSearch />
    </>
  );
};

export default Profile;
