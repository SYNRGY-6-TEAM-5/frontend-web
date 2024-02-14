const LoadingTicket = () => {
  const componentsArray = Array.from({ length: 4 });

  return (
    <>
      {componentsArray.map((_, index) => (
        <div className="animate-pulse" key={index}>
          <div className="h-44 w-full rounded-md bg-gray-200"></div>
        </div>
      ))}
    </>
  );
};

export default LoadingTicket;
