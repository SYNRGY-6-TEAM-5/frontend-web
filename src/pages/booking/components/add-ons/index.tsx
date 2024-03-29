import addOns from "../../assets/add-ons.png";

const AddOns = () => {
  return (
    <div className="font-inter mt-6 flex flex-col">
      <div className="relative m-auto">
        <section className="mx-auto items-center">
          <div className="max-w-[756px]">
            <div className="text-[16px] font-medium">Travel Add-ons</div>
          </div>
          <div className="mt-1 flex h-full w-full max-w-[756px] items-center justify-center">
            <div className="flex h-[128px] w-[756px] flex-col justify-around rounded-lg bg-white px-4 py-3 shadow-md">
              <div className="flex flex-row justify-between">
                <div className="lead flex-shrink-0 text-base font-medium leading-6">
                  Baggage
                </div>
                <div className="flex-shrink-0">
                  <img src={addOns} alt="" />
                </div>
              </div>
              <div className="flex h-[60px] items-center justify-start rounded-lg bg-[#F9F9FB] px-5">
                <p className="max-w-[259px] text-xs font-normal leading-4 text-[#5D6B98]">
                  Adding baggage here is cheaper than at the airport
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex h-full w-full max-w-[756px] items-center justify-center">
            <div className="flex h-[128px] w-[756px] flex-col justify-around rounded-lg bg-white px-4 py-3 shadow-md">
              <div className="flex flex-row justify-between">
                <div className="lead flex-shrink-0 text-base font-medium leading-6">
                  Meal
                </div>
                <div className="flex-shrink-0">
                  <img src={addOns} alt="" />
                </div>
              </div>
              <div className="flex h-[60px] items-center justify-start rounded-lg bg-[#F9F9FB] px-5">
                <p className="max-w-[259px] text-xs font-normal leading-4 text-[#5D6B98]">
                  Don’t let others hear your tummy growl for the whole flight
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddOns;
