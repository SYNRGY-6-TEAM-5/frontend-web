import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import SortByTabContent from "./tabs/SortBy";
import DepartureTimeTabContent from "./tabs/DepartureTime";
import DurationTabContent from "./tabs/Duration";
import CabinClassTabContent from "./tabs/CabinClass";
import AirlineTabContent from "./tabs/Airline";
import LayoverTabContent from "./tabs/Layover";

const FilterDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
              stroke-width="1.125"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.1975 1.57507L4.5 7.50007"
              stroke="#111111"
              stroke-width="1.125"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <button className="text-[14px]">Filter & Sort</button>
        </div>
      </DialogTrigger>
      <DialogContent className="h-[29rem] w-[40rem] backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="pb-4">Filter</DialogTitle>
          <Separator
            orientation="horizontal"
            className="h-[0.1px] w-full bg-black"
          />
        </DialogHeader>
        <div className="flex flex-col items-start justify-between">
          <Tabs defaultValue="sort-by" className="flex w-full flex-row">
            <TabsList className="w-35 flex h-full flex-col items-start justify-between gap-1 bg-transparent">
              <TabsTrigger
                value="sort-by"
                className="h-10 items-start bg-white data-[state=active]:bg-white"
              >
                Sort By
              </TabsTrigger>
              <TabsTrigger
                value="departure-time"
                className="h-10 items-start bg-white data-[state=active]:bg-white"
              >
                Departure Time
              </TabsTrigger>
              <TabsTrigger
                value="duration"
                className="h-10 items-start bg-white data-[state=active]:bg-white"
              >
                Duration
              </TabsTrigger>
              <TabsTrigger
                value="cabin-class"
                className="h-10 items-start bg-white data-[state=active]:bg-white"
              >
                Cabin Class
              </TabsTrigger>
              <TabsTrigger
                value="airline"
                className="h-10 items-start bg-white data-[state=active]:bg-white"
              >
                Airline
              </TabsTrigger>
              <TabsTrigger
                value="number-of-layovers"
                className="h-10 items-start bg-white data-[state=active]:bg-white"
              >
                Number of Layovers
              </TabsTrigger>
            </TabsList>
            <Separator
              orientation="vertical"
              className="z-50 h-full w-[0.1px] bg-black"
            />
            <SortByTabContent />
            <DepartureTimeTabContent />
            <DurationTabContent />
            <CabinClassTabContent />
            <AirlineTabContent />
            <LayoverTabContent />
          </Tabs>
          <div className="flex w-full flex-row items-end justify-between">
            <Button variant="ghost" className="h-8">
              Reset
            </Button>
            <DialogClose>
              <Button variant="primary" className="h-8">
                Apply
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
