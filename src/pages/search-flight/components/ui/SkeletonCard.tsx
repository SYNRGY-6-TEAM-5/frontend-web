import { Text } from "@mantine/core";

interface props {
    cardTitle: string;
  }

const SkeletonCard = ({ cardTitle }: props) => {
  return (
    <div className="grid h-full md:h-44 w-full md:grid-cols-3 md:gap-2 overflow-hidden rounded-xl border-4 border-dashed border-gray-100 p-2 gap-5">
      <div className="flex flex-col items-start justify-center gap-4">
        <div className="h-12 w-12 rounded-full bg-slate-200" />
        <div className="space-y-2">
          <div className="h-4 w-[250px] bg-slate-200" />
          <div className="h-4 w-[200px] bg-slate-200" />
        </div>
      </div>
      <div className="flex flex-col min-h-22 items-center justify-center gap-4">
        <div className="h-40 md:h-5/6 w-5/6 rounded-2xl bg-slate-200 flex items-center justify-center">
            <Text className="text-slate-500 text-lg font-semibold text-center">{`No ${cardTitle} Ticket Selected`}</Text>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-4">
        <div className="flex gap-6">
          <div className="h-12 w-12 rounded-full bg-slate-200" />
          <div className="h-12 w-12 rounded-full bg-slate-200" />
        </div>
        <div className="flex flex-col items-end justify-center space-y-2">
          <div className="h-4 w-[250px] bg-slate-200"></div>
          <div className="h-4 w-[200px] bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
