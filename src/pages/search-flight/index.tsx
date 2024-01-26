import NavBar from "@/components/containers/NavBar";
import CopyrightSearch from "./components/Copyright";
import DatePrice from "./components/DatePrice";
import DiscountSection from "./components/DiscountSection";
import FilterSort from "./components/FiterSort";
import FooterSearch from "./components/Footer";
import ListTicket from "./components/ListTicket";
import SearchBox from "./components/SearchBox";

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
