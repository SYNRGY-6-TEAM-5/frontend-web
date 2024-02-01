const Baggage = () => {
  return (
    <>
      <div className="mt-8 mb-5 grid gap-4">
        <label className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-3 font-medium ring-1 ring-gray-200 has-[:checked]:bg-primary-50 has-[:checked]:ring-primary-500">
          10 KG
          <span className="text-xs font-normal">IDR 99,000</span>
          <input name="baggage" value={10} type="radio" className="hidden" />
        </label>
        <label className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-3 font-medium ring-1 ring-gray-200 has-[:checked]:bg-primary-50 has-[:checked]:ring-primary-500">
          16 KG
          <span className="text-xs font-normal">IDR 199,000</span>
          <input name="baggage" value={15} type="radio" className="hidden" />
        </label>
        <label className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-3 font-medium ring-1 ring-gray-200 has-[:checked]:bg-primary-50 has-[:checked]:ring-primary-500">
          24 KG
          <span className="text-xs font-normal">IDR 299,000</span>
          <input name="baggage" value={24} type="radio" className="hidden" />
        </label>
        <label className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-3 font-medium ring-1 ring-gray-200 has-[:checked]:bg-primary-50 has-[:checked]:ring-primary-500">
          32 KG
          <span className="text-xs font-normal">IDR 399,000</span>
          <input name="baggage" value={32} type="radio" className="hidden" />
        </label>
      </div>
    </>
  );
};

export default Baggage;
