import NavBar from "@/components/containers/NavBar";
import CopyrightSearch from "./components/Copyright";
import DiscountSection from "./components/DiscountSection";
import FooterSearch from "../../components/containers/Footer";
import ListTicket from "./components/ListTicket";
import SearchBox from "./components/SearchBox";
import DatePrice from "./components/DatePrice";
import FilterSort from "./components/FiterSort";

const SearchFlight = () => {
  return (
    <>
      <div className="flex flex-col bg-[#FBFBFB]">
        <NavBar />
        <SearchBox />
        <DatePrice />
        <FilterSort />
        <ListTicket />
        <DiscountSection />
        <FooterSearch />
        <CopyrightSearch />
      </div>
    </>
  );
};

export default SearchFlight;
