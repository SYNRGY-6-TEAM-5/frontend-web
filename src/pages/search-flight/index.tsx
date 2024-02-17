import { useLocation } from "react-router-dom";

import NavBar from "@/components/containers/NavBar";
import FooterSearch from "../../components/containers/Footer";
import ListTicket from "./components/ListTicket";
import SearchBox from "./components/SearchBox";
import DatePrice from "./components/DatePrice";
import FilterSort from "./components/FiterSort";
import CopyrightSearch from "@/components/containers/Copyright";
import { CtaSection } from "../home/components/containers/CtaSection";

const SearchFlight = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const trip_type = searchParams.get("trip-type") || "";

  return (
    <>
      <div className="flex flex-col bg-[#FBFBFB]">
        <NavBar />
        <SearchBox />
        <DatePrice tripType={trip_type} />
        <FilterSort />
        <ListTicket />
        <CtaSection />
        <FooterSearch />
        <CopyrightSearch />
      </div>
    </>
  );
};

export default SearchFlight;
