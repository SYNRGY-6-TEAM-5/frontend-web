import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="flex justify-center bg-gray-100">
        <div className="my-10 flex h-[842px] w-[595px] flex-col bg-white"></div>
      </div>
      <div className="absolute left-0 top-0 flex h-screen w-screen bg-black/50">
        <Loader2 className="m-auto h-20 w-20 animate-spin text-gray-200" />
      </div>
    </div>
  );
};

export default LoadingScreen;
