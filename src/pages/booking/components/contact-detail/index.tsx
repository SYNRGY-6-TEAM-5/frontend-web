import { Text } from "@mantine/core";

import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import ContactDetailsForm from "./components/ContactDetailsForm";

const ContactDetail = () => {
  return (
    <section className="flex flex-col gap-2">
      <div className="px-2">
        <Text className="pb-2 text-lg font-normal text-black">
          Contact Details
        </Text>
      </div>
    <Card className="mb-8">
      <CardContent className="px-6 py-8">
        <ContactDetailsForm />
      </CardContent>
      <CardFooter className="text-sm font-normal text-slate-800">
        Ticket information and confirmation will be sent to the contact details listed
      </CardFooter>
    </Card>
    </section>
  );
};

export default ContactDetail;
