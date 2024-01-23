import DiscountSearch from "../../../assets/discount-search.png";

const DiscountSection = () => {
  return (
    <div className="mx-auto mt-9 flex">
      <section className="flex h-[452px] items-center justify-between overflow-x-hidden">
        <div className="flex h-full w-full bg-[#111]">
          <div className="ml-9 flex w-full flex-col items-start justify-center text-white">
            <div className="max-w-[505px] text-[40px] font-medium leading-[60px] tracking-[-0.96px]">
              Sign up now and Get a 30% Discount on All Cabin Class
            </div>
            <div className="mt-4  text-[16px] font-normal leading-6">
              Don't miss out on this opportunity to make every trip a luxurious
              escape. Join us today and elevate your travel with unparalleled
              savings.
            </div>
            <div className="mt-14 flex gap-4">
              <button className="rounded-12 border-Gray-200 text-Gray-200 text-14 flex h-[56px] w-[232px] items-center justify-center rounded-xl border px-4 font-medium">
                More info
              </button>

              <button className="rounded-12 text-Base-White text-14 flex h-[56px] w-[232px] items-center justify-center rounded-xl bg-primary-500 px-4 font-medium">
                Sign up now
              </button>
            </div>
          </div>
          <div className="flex h-full w-full items-center justify-end">
            <img
              src={DiscountSearch}
              alt=""
              className="max-h-full max-w-[575px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscountSection;
