import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@mantine/core";
import { Separator } from "@/components/ui/separator";

type CardProps = React.ComponentProps<typeof Card>;

const FilterDialog: React.FC<CardProps> = ({ className, ...props }) => {
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
            <TabsContent value="sort-by" className="w-full">
              <Card>
                <ul className="flex w-full flex-col items-center justify-center gap-2">
                  <li>
                    <input
                      type="radio"
                      id="economy-class"
                      name="ticket-class"
                      value="Economy"
                      className="peer hidden"
                      required
                      // checked={ticketClass === "Economy"}
                      // onChange={handleTicketClassChange}
                    />
                    <label
                      htmlFor="economy-class"
                      className="inline-flex w-full min-w-[7.5rem] cursor-pointer items-center justify-between rounded-full bg-slate-100 p-2 text-zinc-900 hover:bg-primary-200 hover:text-white peer-checked:bg-primary-500 peer-checked:text-white"
                    >
                      <Text className="text-center text-xs font-semibold">
                        Economy Class
                      </Text>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="business-class"
                      name="ticket-class"
                      value="Business"
                      className="peer hidden"
                      required
                      // checked={ticketClass === "Business"}
                      // onChange={handleTicketClassChange}
                    />
                    <label
                      htmlFor="business-class"
                      className="inline-flex w-full min-w-[7.5rem] cursor-pointer items-center justify-between rounded-full bg-slate-100 p-2 text-zinc-900 hover:bg-primary-200 hover:text-white peer-checked:bg-primary-500 peer-checked:text-white"
                    >
                      <div className="flex w-full items-center justify-center">
                        <Text className="text-xs font-semibold">
                          Business Class
                        </Text>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="first-class"
                      name="ticket-class"
                      value="First"
                      className="peer hidden"
                      required
                      // checked={ticketClass === "First"}
                      // onChange={handleTicketClassChange}
                    />
                    <label
                      htmlFor="first-class"
                      className="inline-flex w-full min-w-[7.5rem] cursor-pointer items-center justify-between rounded-full bg-slate-100 p-2 text-zinc-900 hover:bg-primary-200 hover:text-white peer-checked:bg-primary-500 peer-checked:text-white"
                    >
                      <Text className="pl-2 text-xs font-semibold">
                        First Class
                      </Text>
                    </label>
                  </li>
                </ul>
              </Card>
            </TabsContent>
            <TabsContent value="departure-time">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2"></CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
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
