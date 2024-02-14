import FilterDialog from "./ui/FilterDIalog";

const FilterSort = () => {
  return (
    <div className="relative mt-7 px-6 md:px-9 lg:px-20">
      <section className="mx-auto flex h-[66px] w-full flex-row items-center justify-between overflow-x-hidden rounded-[8px]  ">
        <div className="text-[16px] font-semibold">Search Result</div>
        <div className=" flex items-center justify-center">
          <div className="text-[14px] font-normal text-[#7D89B0]">
            "16 Result"
          </div>
            <FilterDialog />
        </div>
      </section>
    </div>
  );
};

export default FilterSort;
