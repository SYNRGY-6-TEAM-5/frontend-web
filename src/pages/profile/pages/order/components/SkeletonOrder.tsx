const SkeletonOrder = () => {
  const componentsArray = Array.from({ length: 4 });

  return (
    <>
      <div className="h-14 w-full animate-pulse rounded-md bg-gray-200"></div>
      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
        {componentsArray.map((_, index) => (
          <div className="animate-pulse" key={index}>
            <div className="h-48 w-full rounded-md bg-gray-200"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkeletonOrder;
