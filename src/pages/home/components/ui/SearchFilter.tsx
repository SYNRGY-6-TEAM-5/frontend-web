import { MagnifyingGlassIcon, CalendarIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowsLeftRight,
  AirplaneTakeoff,
  AirplaneLanding,
} from "@phosphor-icons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { toast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A departure date is required.",
  }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

type CardProps = React.ComponentProps<typeof Card>;

export function SearchFilter({ className, ...props }: CardProps) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="bg-slate-950 mt-2 w-[340px] rounded-md p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex h-full items-center justify-center">
      <Card
        className={cn("bg-gray-900 flex justify-end", className)}
        {...props}
      >
        <CardContent className="grid gap-4 p-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="rounded-md bg-black-900">
              <Tabs defaultValue="one-way" className="w-[400px]">
                <TabsList className="grid w-72 grid-cols-3 bg-black-900">
                  <TabsTrigger value="one-way" className="text-white">
                    One-Way
                  </TabsTrigger>
                  <TabsTrigger value="roundtrip" className="text-white">
                    Roundtrip
                  </TabsTrigger>
                  <TabsTrigger value="multi" className="text-white">
                    Multi
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="one-way"
                  className="flex flex-col gap-2 px-4"
                >
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6 pt-4"
                    >
                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <>
                            <FormItem>
                              <div className="flex w-full items-center rounded-md border bg-white p-4">
                                <div className="space-3 bg-slate-500 flex flex-1 flex-row items-center gap-3">
                                  <div className="flex flex-col bg-white">
                                    <div className="pointer-events-none inset-y-0 start-0 mb-3 flex flex-row items-center pr-3 ps-3.5">
                                      <AirplaneTakeoff
                                        size={42}
                                        className="h-6 w-6"
                                      />
                                      <label
                                        htmlFor="origin"
                                        className="text-gray-900 ml-2 block text-sm font-medium dark:text-white"
                                      >
                                        Origin
                                      </label>
                                    </div>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="w-[8.5rem]"
                                        >
                                          Edit Profile
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px] backdrop-blur-md">
                                        <DialogHeader>
                                          <DialogTitle>
                                            Edit profile
                                          </DialogTitle>
                                          <DialogDescription>
                                            Make changes to your profile here.
                                            Click save when you're done.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="name"
                                              className="text-right"
                                            >
                                              Name
                                            </Label>
                                            <Input
                                              id="name"
                                              value="Pedro Duarte"
                                              className="col-span-3"
                                            />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="username"
                                              className="text-right"
                                            >
                                              Username
                                            </Label>
                                            <Input
                                              id="username"
                                              value="@peduarte"
                                              className="col-span-3"
                                            />
                                          </div>
                                        </div>
                                        <DialogFooter>
                                          <Button type="submit">
                                            Save changes
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </div>

                                  <Button
                                    variant="primary"
                                    className="border-primary-100 relative h-10 w-6 rounded-full border-4"
                                  >
                                    <ArrowsLeftRight
                                      size={42}
                                      className="absolute h-4 w-4"
                                    />
                                  </Button>

                                  <div className="flex flex-col bg-white">
                                    <div className="pointer-events-none inset-y-0 start-0 mb-3 flex flex-row items-center pr-3 ps-3.5">
                                      <AirplaneLanding
                                        size={42}
                                        className="h-6 w-6"
                                      />
                                      <label
                                        htmlFor="destination"
                                        className="text-gray-900 ml-2 block text-sm font-medium dark:text-white"
                                      >
                                        Destination
                                      </label>
                                    </div>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="w-[8.5rem]"
                                        >
                                          Edit Profile
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                          <DialogTitle>
                                            Edit profile
                                          </DialogTitle>
                                          <DialogDescription>
                                            Make changes to your profile here.
                                            Click save when you're done.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="name"
                                              className="text-right"
                                            >
                                              Name
                                            </Label>
                                            <Input
                                              id="name"
                                              value="Pedro Duarte"
                                              className="col-span-3"
                                            />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="username"
                                              className="text-right"
                                            >
                                              Username
                                            </Label>
                                            <Input
                                              id="username"
                                              value="@peduarte"
                                              className="col-span-3"
                                            />
                                          </div>
                                        </div>
                                        <DialogFooter>
                                          <Button type="submit">
                                            Save changes
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </div>
                              </div>
                            </FormItem>
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-white">
                                Departure Date
                              </FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                            <FormItem>
                              <FormLabel className="text-white">
                                Passenger(s) and Cabin Class
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a verified email to display" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="m@example.com">
                                    m@example.com
                                  </SelectItem>
                                  <SelectItem value="m@google.com">
                                    m@google.com
                                  </SelectItem>
                                  <SelectItem value="m@support.com">
                                    m@support.com
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          </>
                        )}
                      />
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent
                  value="roundtrip"
                  className="flex flex-col gap-2 px-4"
                >
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6 pt-4"
                    >
                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <>
                            <FormItem>
                              <div className="flex w-full items-center rounded-md border bg-white p-4">
                                <div className="space-3 bg-slate-500 flex flex-1 flex-row items-center gap-3">
                                  <div className="flex flex-col bg-white">
                                    <div className="pointer-events-none inset-y-0 start-0 mb-3 flex flex-row items-center pr-3 ps-3.5">
                                      <AirplaneTakeoff
                                        size={42}
                                        className="h-6 w-6"
                                      />
                                      <label
                                        htmlFor="origin"
                                        className="text-gray-900 ml-2 block text-sm font-medium dark:text-white"
                                      >
                                        Origin
                                      </label>
                                    </div>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="w-[8.5rem]"
                                        >
                                          Edit Profile
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                          <DialogTitle>
                                            Edit profile
                                          </DialogTitle>
                                          <DialogDescription>
                                            Make changes to your profile here.
                                            Click save when you're done.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="name"
                                              className="text-right"
                                            >
                                              Name
                                            </Label>
                                            <Input
                                              id="name"
                                              value="Pedro Duarte"
                                              className="col-span-3"
                                            />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="username"
                                              className="text-right"
                                            >
                                              Username
                                            </Label>
                                            <Input
                                              id="username"
                                              value="@peduarte"
                                              className="col-span-3"
                                            />
                                          </div>
                                        </div>
                                        <DialogFooter>
                                          <Button type="submit">
                                            Save changes
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </div>

                                  <Button
                                    variant="primary"
                                    className="border-primary-100 relative h-10 w-6 rounded-full border-4"
                                  >
                                    <ArrowsLeftRight
                                      size={42}
                                      className="absolute h-4 w-4"
                                    />
                                  </Button>

                                  <div className="flex flex-col bg-white">
                                    <div className="pointer-events-none inset-y-0 start-0 mb-3 flex flex-row items-center pr-3 ps-3.5">
                                      <AirplaneLanding
                                        size={42}
                                        className="h-6 w-6"
                                      />
                                      <label
                                        htmlFor="destination"
                                        className="text-gray-900 ml-2 block text-sm font-medium dark:text-white"
                                      >
                                        Destination
                                      </label>
                                    </div>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="w-[8.5rem]"
                                        >
                                          Edit Profile
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                          <DialogTitle>
                                            Edit profile
                                          </DialogTitle>
                                          <DialogDescription>
                                            Make changes to your profile here.
                                            Click save when you're done.
                                          </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="name"
                                              className="text-right"
                                            >
                                              Name
                                            </Label>
                                            <Input
                                              id="name"
                                              value="Pedro Duarte"
                                              className="col-span-3"
                                            />
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <Label
                                              htmlFor="username"
                                              className="text-right"
                                            >
                                              Username
                                            </Label>
                                            <Input
                                              id="username"
                                              value="@peduarte"
                                              className="col-span-3"
                                            />
                                          </div>
                                        </div>
                                        <DialogFooter>
                                          <Button type="submit">
                                            Save changes
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </div>
                              </div>
                            </FormItem>
                            
                            <div className="flex flex-row gap-6">
                            <FormItem className="flex flex-col w-full">
                              <FormLabel className="text-white">
                                Departure Date
                              </FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                            <FormItem className="flex flex-col w-full">
                              <FormLabel className="text-white">
                                Arrival Date
                              </FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                            </div>
                            <FormItem>
                              <FormLabel className="text-white">
                                Passenger(s) and Cabin Class
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a verified email to display" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="m@example.com">
                                    m@example.com
                                  </SelectItem>
                                  <SelectItem value="m@google.com">
                                    m@google.com
                                  </SelectItem>
                                  <SelectItem value="m@support.com">
                                    m@support.com
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          </>
                        )}
                      />
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </div>
            <Button
              variant="primary"
              className="h-12 w-full items-center rounded-md p-4"
            >
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" /> Cari
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
