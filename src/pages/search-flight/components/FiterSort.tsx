const FilterSort = () => {
  return (
    <div className="relative mt-7 px-6 md:px-9 lg:px-20">
      <section className="mx-auto flex h-[66px] w-full flex-row items-center justify-between overflow-x-hidden rounded-[8px]  ">
        <div className="text-[16px] font-semibold">Search Result</div>
        <div className=" flex items-center justify-center">
          <div className="text-[14px] font-normal text-[#7D89B0]">
            "16 Result"
          </div>
          <div className="ml-5 flex gap-2 rounded-full bg-white px-3 py-2 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M4.0498 1.57507H13.9498C14.7748 1.57507 15.4498 2.25007 15.4498 3.07507V4.72507C15.4498 5.32507 15.0748 6.07507 14.6998 6.45007L11.4748 9.30007C11.0248 9.67507 10.7248 10.4251 10.7248 11.0251V14.2501C10.7248 14.7001 10.4248 15.3001 10.0498 15.5251L8.9998 16.2001C8.02481 16.8001 6.6748 16.1251 6.6748 14.9251V10.9501C6.6748 10.4251 6.3748 9.75007 6.0748 9.37507L3.2248 6.37507C2.8498 6.00007 2.5498 5.32507 2.5498 4.87507V3.15007C2.5498 2.25007 3.2248 1.57507 4.0498 1.57507Z"
                stroke="#111111"
                strokeWidth="1.125"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.1975 1.57507L4.5 7.50007"
                stroke="#111111"
                strokeWidth="1.125"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <button className="text-[14px]">Filter & Sort</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FilterSort;
