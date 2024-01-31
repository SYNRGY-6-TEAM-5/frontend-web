import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DialogAddOns from "./components/DialogAddOns";

const TravelAddOns = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Travel Add Ons</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <DialogAddOns type="Baggage" />
        <DialogAddOns type="Meal" />
      </CardHeader>
    </Card>
  );
};

export default TravelAddOns;
