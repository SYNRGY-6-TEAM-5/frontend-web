import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Text } from "@mantine/core";
import { ChevronDown, SearchIcon, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { AirportDetails } from "@/types/Ticket";
import { IParams } from "@/types/ApiResponse";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

interface SelectAirportDialogProps {
  airports: AirportDetails[];
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onAirportSelect: (airport: any) => void;
  setParams: Dispatch<SetStateAction<IParams>>;
  isActive: boolean;
  switchedAirport: Partial<AirportDetails> | null;
}

const SelectAirportDialog: React.FC<SelectAirportDialogProps> = ({
  airports,
  handleSearch,
  onAirportSelect,
  setParams,
  isActive,
  switchedAirport,
}) => {
  const [selectedAirport, setSelectedAirport] = useState<
    Partial<AirportDetails>
  >({
    airport_name: "",
    city_iata_code: "",
    country_iso_code: "",
    city_name: "",
    iata_code: "",
  });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    // Update selectedAirport when isActive changes and switchedAirport is not null
    if (isActive && switchedAirport) {
      setSelectedAirport(switchedAirport);
    }
  }, [isActive, switchedAirport]);

  const handleAirportClick = (airport: any) => {
    onAirportSelect({
      airport_name: airport.airport_name,
      city_iata_code: airport.city_iata_code,
      country_iso_code: airport.country_iso_code,
      city_name: airport.city_name,
      iata_code: airport.iata_code,
    });

    setSelectedAirport({
      airport_name: airport.airport_name,
      city_iata_code: airport.city_iata_code,
      country_iso_code: airport.country_iso_code,
      city_name: airport.city_name,
      iata_code: airport.iata_code,
    });

    setParams({
      search: "",
      page: 1,
      size: 10,
    });
  };

  if (!isDesktop) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="transparent"
            className="h-15 relative flex w-full flex-col items-start justify-start rounded-none border-b border-dashed border-b-primary-500 py-1 pl-0"
          >
            {selectedAirport.iata_code !== "" ? (
              <Text className="-left-4 w-full text-start text-2xl font-semibold text-slate-700 lg:text-xl">
                {selectedAirport.iata_code}
              </Text>
            ) : (
              <Text className="w-full text-start text-sm font-semibold text-slate-400 lg:text-sm">
                Pick an airport
              </Text>
            )}

            {/* <Text className="w-full text-start text-[9pt] font-bold tracking-wider text-primary-500">
            {selectedAirport.iata_code !== ""
              ? `${selectedAirport.airport_name} (${selectedAirport.iata_code})`
              : ""}
          </Text> */}
            <ChevronDown
              size={20}
              className="font-base absolute -right-2 top-1/4 text-primary-500"
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-full backdrop-blur-md">
          <DrawerHeader>
            <DrawerTitle className="pb-4">Select city or airport</DrawerTitle>
            <DrawerDescription>
              <span className="flex flex-row items-center justify-between gap-3 rounded-lg bg-slate-100 pl-4">
                <SearchIcon size={24} className="h-[16px] w-[16px]" />
                <Input
                  id="airport"
                  type="text"
                  placeholder="Enter city or airport"
                  autoCapitalize="none"
                  autoComplete="on"
                  autoCorrect="on"
                  className="inline-flex h-10 w-full items-center justify-start gap-3 rounded-lg border-none bg-gray-100 px-3 py-2.5 opacity-80"
                  onChange={handleSearch}
                  required
                />
              </span>{" "}
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid">
            <div className="flex flex-row items-center justify-between px-2">
              <Text
                typeof="p"
                className="w-32 text-sm font-light text-primary-500 lg:text-sm"
              >
                Recent Search
              </Text>
              <Button variant="transparent" className="h-10 w-auto">
                <Trash
                  size={15}
                  className="w-full text-right font-bold text-gray-400"
                />
              </Button>
            </div>
            <ScrollArea className="h-56 max-h-56 w-full overflow-y-auto">
              <div className="flex flex-col items-center gap-2">
                {airports.map((airport, index) => (
                  <DrawerClose
                    key={index}
                    className="flex h-14 w-full items-center justify-between rounded-lg border-b border-neutral-200 py-3 pl-2 pr-6 hover:bg-slate-200"
                    onClick={() => {
                      handleAirportClick(airport);
                    }}
                  >
                    <div className="inline-flex flex-col items-start justify-start gap-1">
                      <div className="text-base font-semibold text-neutral-900">
                        {`${airport.city_name} (${airport.city_iata_code}), ${airport.country_iso_code}`}
                      </div>
                      <div className="text-sm font-semibold text-slate-500">
                        {`${airport.airport_name} (${airport.iata_code})`}
                      </div>
                    </div>
                    <div className="text-base font-semibold tracking-wider text-neutral-900">
                      {airport.iata_code}
                    </div>
                  </DrawerClose>
                ))}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="transparent"
          className="h-15 relative flex w-full flex-col items-start justify-start rounded-none border-b border-dashed border-b-primary-500 py-1 pl-0"
        >
          {selectedAirport.iata_code !== "" ? (
            <Text className="-left-4 w-full text-start text-2xl font-semibold text-slate-700 lg:text-xl">
              {selectedAirport.iata_code}
            </Text>
          ) : (
            <Text className="w-full text-start text-sm font-semibold text-slate-400 lg:text-sm">
              Pick an airport
            </Text>
          )}

          {/* <Text className="w-full text-start text-[9pt] font-bold tracking-wider text-primary-500">
            {selectedAirport.iata_code !== ""
              ? `${selectedAirport.airport_name} (${selectedAirport.iata_code})`
              : ""}
          </Text> */}
          <ChevronDown
            size={20}
            className="font-base absolute -right-2 top-1/4 text-primary-500"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] backdrop-blur-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="pb-4">Select city or airport</DialogTitle>
          <DialogDescription>
            <span className="flex flex-row items-center justify-between gap-3 rounded-lg bg-slate-100 pl-4">
              <SearchIcon size={24} className="h-[16px] w-[16px]" />
              <Input
                id="airport"
                type="text"
                placeholder="Enter city or airport"
                autoCapitalize="none"
                autoComplete="on"
                autoCorrect="on"
                className="inline-flex h-10 w-full items-center justify-start gap-3 rounded-lg border-none bg-gray-100 px-3 py-2.5 opacity-80"
                onChange={handleSearch}
                required
              />
            </span>{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="grid">
          <div className="flex flex-row items-center justify-between">
            <Text
              typeof="p"
              className="w-32 text-sm font-light text-primary-500 lg:text-sm"
            >
              Recent Search
            </Text>
            <Button variant="transparent" className="h-10 w-auto">
              <Trash
                size={15}
                className="w-full text-right font-bold text-gray-400"
              />
            </Button>
          </div>
          <ScrollArea className="h-56 max-h-56 w-full overflow-y-auto">
            <div className="flex flex-col items-center gap-2">
              {airports.map((airport, index) => (
                <DialogClose
                  key={index}
                  className="flex h-14 w-full items-center justify-between rounded-lg border-b border-neutral-200 py-3 pl-2 pr-6 hover:bg-slate-200"
                  onClick={() => {
                    handleAirportClick(airport);
                  }}
                >
                  <div className="inline-flex flex-col items-start justify-start gap-1">
                    <div className="text-base font-semibold text-neutral-900">
                      {`${airport.city_name} (${airport.city_iata_code}), ${airport.country_iso_code}`}
                    </div>
                    <div className="text-sm font-semibold text-slate-500">
                      {`${airport.airport_name} (${airport.iata_code})`}
                    </div>
                  </div>
                  <div className="text-base font-semibold tracking-wider text-neutral-900">
                    {airport.iata_code}
                  </div>
                </DialogClose>
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectAirportDialog;
