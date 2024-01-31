import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CheckoutButton = () => {
  return (
    <section className="flex flex-col gap-2">
      <Card className="mt-8">
        <CardHeader>
            
        </CardHeader>
        <CardContent className="px-6 py-8">
            <Button type="submit" variant="primary" className="w-full h-14">
                Continue to payment
            </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default CheckoutButton;
