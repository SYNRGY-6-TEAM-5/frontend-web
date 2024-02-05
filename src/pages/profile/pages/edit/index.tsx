const EditProfile = () => {
  return (
    <>
      <div className="ml-[140px] flex gap-10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border border-gray-200">
            NA
          </div>
          <a href="" className="text-sm font-medium text-primary-500">
            Change
          </a>
        </div>
        <div>
          <div className="flex w-[343px] flex-col gap-5">
            <input
              type="text"
              placeholder="Full name"
              className="border-b border-gray-200 bg-[#FBFBFB] py-3 text-base font-normal text-black placeholder:text-gray-300 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Date of birth (DD/MM/YYYY)"
              className="border-b border-gray-200 bg-[#FBFBFB] py-3 text-base font-normal text-black placeholder:text-gray-300 focus:outline-none"
            />
            <div className="flex gap-3 border-b border-gray-200 py-3 text-base font-normal text-gray-300">
              <p>+62</p>
              <span>|</span>
              <input
                type="number"
                placeholder="Phone number"
                className="bg-[#FBFBFB] text-black [appearance:textfield] placeholder:text-gray-300 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
            <button className="mt-8 h-14 rounded-xl bg-primary-500 py-4 text-sm font-medium text-white">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
