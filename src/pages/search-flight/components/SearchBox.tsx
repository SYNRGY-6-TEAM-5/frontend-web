import { useState } from "react";
import Destination from "../../../assets/destination.png";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

const SearchBox = () => {
  const [editMode, setEditMode] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const paramsData: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    paramsData[key] = value;
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = () => {};
  return (
    <div className="relative mt-28 px-6 md:px-9 lg:px-20  ">
      <section className="flex max-h-[126px] w-full flex-row items-center justify-between overflow-x-hidden rounded-[16px] bg-[#111] px-9 text-white md:h-[550px]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className="text-[36px] font-bold text-[#F74E28]">
                {paramsData.origin}
              </div>
              <div className="text-[12px] font-extralight">{paramsData.o_city}</div>
            </div>
            <div className="mx-6">
              <img src={Destination} alt="" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-[36px] font-bold text-[#F74E28]">
                {paramsData.destination}
              </div>
              <div className="text-[12px] font-extralight">{paramsData.d_city}</div>
            </div>
          </div>
          <div className="ml-16 flex items-center justify-center text-[18px] text-[#B9C0D4]">
            {`${format(paramsData.dep_date!, "E, dd MMM yyyy")} - ${paramsData.total_seat} Passengers - ${paramsData.ticket_class} Class`}
          </div>
        </div>
        <div className="rounded-[12px] bg-white">
          {editMode ? (
            <div className="flex flex-row items-center justify-center px-4 py-3">
              <input
                type="text"
                className="w-full rounded-[12px] border border-gray-300 px-4 py-2 text-black focus:border-primary-500 focus:outline-none"
                onChange={handleInputChange}
                placeholder="Enter your search..."
              />
              <button
                className="ml-[10px] text-[16px] text-black"
                onClick={() => setEditMode(false)}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center gap-2 px-4 py-3">
              <button
                className="flex items-center text-[16px] text-black"
                onClick={handleEditClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mr-2"
                >
                  <path
                    d="M19.6242 7.95006L16.0499 4.37499C15.9311 4.25611 15.79 4.1618 15.6347 4.09746C15.4794 4.03312 15.3129 4 15.1448 4C14.9767 4 14.8102 4.03312 14.6549 4.09746C14.4996 4.1618 14.3585 4.25611 14.2396 4.37499L4.37519 14.2402C4.25582 14.3586 4.16118 14.4996 4.09677 14.6549C4.03236 14.8103 3.99947 14.9768 4.00001 15.145V18.72C4.00001 19.0595 4.13486 19.3851 4.3749 19.6251C4.61493 19.8651 4.94049 20 5.27996 20H8.85502C9.02317 20.0005 9.18974 19.9676 9.34507 19.9032C9.50039 19.8388 9.64136 19.7442 9.75979 19.6248L19.6242 9.76039C19.7431 9.64153 19.8374 9.50041 19.9017 9.3451C19.9661 9.18979 19.9992 9.02333 19.9992 8.85522C19.9992 8.68711 19.9661 8.52065 19.9017 8.36534C19.8374 8.21003 19.7431 8.06891 19.6242 7.95006ZM8.85502 18.72H5.27996V15.145L12.3197 8.10525L15.8948 11.6803L8.85502 18.72ZM16.7995 10.7747L13.2245 7.20048L15.1444 5.28056L18.7194 8.85482L16.7995 10.7747Z"
                    fill="#111111"
                  />
                </svg>
                Edit search
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchBox;
