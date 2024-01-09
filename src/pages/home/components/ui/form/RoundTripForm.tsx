import { useForm } from "react-hook-form";

import DialogComponent from "../Dialog";
import PopoverComponent from "../Calendar";
import SelectComponent from "../Select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowsLeftRight,
  AirplaneTakeoff,
  AirplaneLanding,
} from "@phosphor-icons/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";

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

const OneWayForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <>
              <FormItem>
                <div className="flex w-full items-center rounded-md border bg-white p-4">
                  <div className="space-3 flex flex-1 flex-row items-center gap-3 bg-white">
                    <div className="flex flex-col bg-white">
                      <div className="pointer-events-none inset-y-0 start-0 mb-3 flex flex-row items-center pr-3 ps-3.5">
                        <AirplaneTakeoff size={42} className="h-6 w-6" />
                        <label
                          htmlFor="origin"
                          className="ml-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Origin
                        </label>
                      </div>
                      <DialogComponent />
                    </div>

                    <Button
                      variant="primary"
                      className="relative h-10 w-6 rounded-full border-4 border-primary-200"
                    >
                      <ArrowsLeftRight size={42} className="absolute h-4 w-4" />
                    </Button>

                    <div className="flex flex-col bg-white">
                      <div className="pointer-events-none inset-y-0 start-0 mb-3 flex flex-row items-center pr-3 ps-3.5">
                        <AirplaneLanding size={42} className="h-6 w-6" />
                        <label
                          htmlFor="destination"
                          className="ml-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Destination
                        </label>
                      </div>
                      <DialogComponent />
                    </div>
                  </div>
                </div>
              </FormItem>
              <div className="flex flex-row gap-6">
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="text-white">Departure Date</FormLabel>
                  <PopoverComponent field={field} />
                  <FormMessage />
                </FormItem>
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="text-white">Arrival Date</FormLabel>
                  <PopoverComponent field={field} />
                  <FormMessage />
                </FormItem>
              </div>
              <FormItem>
                <FormLabel className="text-white">
                  Passenger(s) and Cabin Class
                </FormLabel>
                <SelectComponent field={field} />
                <FormMessage />
              </FormItem>
            </>
          )}
        />
      </form>
    </Form>
  );
};

export default OneWayForm;
