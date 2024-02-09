import { Card, CardContent } from "@/components/ui/card";

const TimerExpired = () => {

  return (
    <>
      <Card className="h-fit bg-red-600">
        <CardContent className="grid gap-1 p-2 xs:grid-cols-1 xs:text-center md:grid-cols-3 md:text-left">
          <div className="text-white">Your payment is expired</div>
          <div></div>
        </CardContent>
      </Card>
    </>
  );
};

export default TimerExpired;
