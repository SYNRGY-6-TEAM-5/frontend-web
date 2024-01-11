import { useEffect, useState } from "react";
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

export type Airport = {
  airport_name: string;
  iata_code: string;
  icao_code: string;
  latitude: string;
  longitude: string;
  geoname_id: string;
  timezone: string;
  gmt: string;
  phone_number: string;
  country_name: string;
  country_iso2: string;
  city_iata_code: string;
}

export const airports: Airport[] = [
  {
    airport_name: "Anaa",
    iata_code: "AAA",
    icao_code: "NTGA",
    latitude: "-17.05",
    longitude: "-145.41667",
    geoname_id: "6947726",
    timezone: "Pacific/Tahiti",
    gmt: "-10",
    phone_number: "012345678",
    country_name: "French Polynesia",
    country_iso2: "PF",
    city_iata_code: "AAA",
  },
  {
    airport_name: "Abaa",
    iata_code: "ABA",
    icao_code: "NTGA",
    latitude: "-17.05",
    longitude: "-145.41667",
    geoname_id: "6947726",
    timezone: "Pacific/Tahiti",
    gmt: "-10",
    phone_number: "012345678",
    country_name: "French Polynesia",
    country_iso2: "PF",
    city_iata_code: "ABA",
  },
];

interface SelectAirportDialogProps {
  onAirportSelect: (airport: any) => void;
  isActive: boolean;
  switchedAirport: {
    airportName: string;
    cityIataCode: string;
    countryIso2: string;
    iataCode: string;
  } | null;
}

const SelectAirportDialog: React.FC<SelectAirportDialogProps> = ({
  onAirportSelect,
  isActive,
  switchedAirport,
}) => {
  const [selectedAirport, setSelectedAirport] = useState({
    airportName: "",
    cityIataCode: "",
    countryIso2: "",
    iataCode: "",
  });

  useEffect(() => {
    // Update selectedAirport when isActive changes and switchedAirport is not null
    if (isActive && switchedAirport) {
      setSelectedAirport(switchedAirport);
    }
  }, [isActive, switchedAirport]);

  const handleAirportClick = (airport: any) => {
    onAirportSelect({
      airportName: airport.airport_name,
      cityIataCode: airport.city_iata_code,
      countryIso2: airport.country_iso2,
      iataCode: airport.iata_code,
    });

    setSelectedAirport({
      airportName: airport.airport_name,
      cityIataCode: airport.city_iata_code,
      countryIso2: airport.country_iso2,
      iataCode: airport.iata_code,
    });

    console.log({
      airportName: airport.airport_name,
      cityIataCode: airport.city_iata_code,
      countryIso2: airport.country_iso2,
      iataCode: airport.iata_code,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="transparent"
          className="h-15 relative flex w-[8.5rem] flex-col items-start justify-start border-b border-dashed border-b-primary-500"
        >
          {selectedAirport.cityIataCode !== "" ? (
            <Text className="-left-4 w-full text-start text-2xl font-semibold text-slate-700 lg:text-xl">
              {selectedAirport.cityIataCode}
            </Text>
          ) : (
            <Text className="w-full text-start text-sm font-semibold text-slate-400 lg:text-sm">
              Pick an airport
            </Text>
          )}
          
          <Text className="w-full text-start text-[9pt] font-bold tracking-wider text-primary-500">
            {selectedAirport.iataCode !== ""
              ? `${selectedAirport.airportName} (${selectedAirport.iataCode})`
              : ""}
          </Text>
          <ChevronDown
            size={20}
            className="font-base absolute right-0 top-1/4 text-primary-500"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] backdrop-blur-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="pb-4">Select city or airport</DialogTitle>
          <DialogDescription className="pb-4">
            <div className="flex flex-row items-center justify-between gap-3 rounded-lg bg-slate-100 pl-4">
              <SearchIcon size={24} className="h-[16px] w-[16px]" />
              <Input
                id="airport"
                type="text"
                placeholder="Enter city or airport"
                autoCapitalize="none"
                autoComplete="on"
                autoCorrect="on"
                className="inline-flex h-10 w-full items-center justify-start gap-3 rounded-lg bg-gray-100 px-3 py-2.5 opacity-80"
                required
              />
            </div>{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="grid">
          <div className="flex flex-row items-center justify-between">
            <Text typeof="p" className="w-32 text-sm font-light text-primary-500 lg:text-sm">
              Recent Search
            </Text>
            <Button variant="transparent" className="h-10 w-auto">
              <Trash
                size={15}
                className="w-full text-right font-bold text-gray-400"
              />
            </Button>
          </div>

          <ScrollArea className="h-56 max-h-56 w-full overflow-y-auto pt-3">
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
                      {`${airport.airport_name} (${airport.city_iata_code}), ${airport.country_iso2}`}
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
