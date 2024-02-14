import { Image } from "@/components/ui/Image";
import { Input, Text } from "@mantine/core";
import InputCopy from "@/components/ui/input-copy";
import { AlertTriangle, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BankTexts } from "@/components/particles/DataLists";
import { BankMandiri, Bca, MasterCard, Ocbc } from "@/assets/svg";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { usePaymentXendit } from "@/lib/hooks/usePayment";
import { useNavigate, useParams } from "react-router-dom";
import { usePassengerStore } from "@/store/useBookingStore";
import { ToastAction } from "@radix-ui/react-toast";


const methodData = [
  {
    image_logo: BankMandiri,
    title: "Mandiri Virtual Acount",
    value: "mandiri",
  },
  {
    image_logo: Ocbc,
    title: "OCB Virtual Acount",
    value: "ocbc",
  },
  {
    image_logo: Bca,
    title: "BCA Virtual Acount",
    value: "bca",
  },
  {
    image_logo: MasterCard,
    title: "Master Card / Visa",
    value: "debit",
  },
];

const MethodDetails = ({ bankMethod }: { bankMethod: string }) => {
  const { mutateAsync: makeXenditPayment } = usePaymentXendit();
  const { booking_id } = useParams();
  const { totalAmount } =
    usePassengerStore();

  const navigate = useNavigate();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [virtualAccount, setVirtualAccount] = useState<string>("");

  const filteredData = methodData
    .filter((data) => data.value === bankMethod)
    .map((dataBank) => {
      return dataBank;
    });
  const filteredMethod = BankTexts.filter(
    (banks) => banks.value === bankMethod,
  ).map((filteredBank) => {
    return filteredBank;
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/complete`,
      },
      redirect: "if_required"
    });

    if (error) {
      toast({
        title: "Payment Failed",
        variant: "destructive",
        description: error.message,
      });
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentSuccess(true);
      toast({
        title: "Payment Success",
        variant: "success",
        description: paymentIntent.status,
        action: (
          <ToastAction altText="Goto My-Flight">
            <Button variant="ghost" onClick={() => navigate("/profile")}>
              Go to my flight
            </Button>
          </ToastAction>
        ),
      });
    } else if (paymentIntent && paymentIntent.status === "requires_confirmation") {
      toast({
        title: "Payment Failed",
        variant: "destructive",
        description: paymentIntent.status,
      });
    } else {
      toast({
        title: "Payment Failed",
        variant: "destructive",
        description: paymentIntent.status,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!booking_id) {
      return
    }

    const xenditPayload: any = {
      bookingId: parseInt(booking_id, 10),
      bankCode: bankMethod.toUpperCase()
    };
    const fetchVirtualAccount = async () => {
      const { data } = await makeXenditPayment(xenditPayload);
      setVirtualAccount(data.va);
    };
    if (!virtualAccount) {
      fetchVirtualAccount();
    }
  }, [booking_id, virtualAccount]);

  useEffect(() => {
    if (paymentSuccess) { // Step 4: Start countdown on payment success
      const redirectTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Redirect to home when countdown reaches 0
      if (countdown === 0) {
        clearInterval(redirectTimer);
        navigate("/profile"); // Navigate to profile on countdown complete
      }

      // Clear the timer when the component unmounts
      return () => clearInterval(redirectTimer);
    }
  }, [countdown, navigate, paymentSuccess]);

  return (
    <div className="flex flex-col space-y-10">
      {bankMethod !== "debit" ? (
        <>
          <div>
            <div className="mb-4 flex flex-row">
              <Image
                className="aspect-square h-6 w-20 md:h-6 md:w-20 lg:h-6 lg:w-20"
                image={filteredData[0].image_logo}
                alt={filteredData[0].title}
              />
              <Text>{filteredData[0].title}</Text>
            </div>
            {virtualAccount && virtualAccount !== "" && (
              <InputCopy
                id="account"
                name="account"
                value={virtualAccount}
                className="mb-5"
              />)}

            <div className="space-y-4">
              <Text className="text-base font-medium">Total Payment</Text>
              <Input
                disabled
                className="rounded-lg bg-gray-100 text-sm font-medium text-black"
                type="text"
                value={`IDR ${totalAmount.toLocaleString()}`}
              />
              <div className="flex flex-row space-x-1 text-xs">
                <AlertTriangle size={24} className="text-warning-500" />
                <Text className="text-gray-400">
                  Complete the payment and ensure that the amount and recipient
                  are correct
                </Text>
              </div>
            </div>
          </div>
          <div className="space-y-3 px-4 text-base">
            <Text className="font-medium">How To Pay</Text>
            <Accordion
              type="single"
              collapsible
              className="w-full rounded-lg border p-2 text-sm"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Transfer via ATM</AccordionTrigger>
                <AccordionContent className="grid gap-2">
                  {filteredMethod[0].atm.map((atmMethod, i) => (
                    <div className="flex items-center gap-x-3" key={i}>
                      <Check size={10} />
                      <Text className="text-sm">{atmMethod}</Text>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Transfer via Internet Banking
                </AccordionTrigger>
                <AccordionContent className="grid gap-2">
                  {filteredMethod[0].internet.map((internetMethod, i) => (
                    <div className="flex items-center gap-x-3" key={i}>
                      <Check size={10} />
                      <Text className="text-sm">{internetMethod}</Text>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Transfer via Mobile Banking</AccordionTrigger>
                <AccordionContent className="grid gap-2">
                  {filteredMethod[0].mobile.map((mobileMethod, i) => (
                    <div className="flex items-center gap-x-3" key={i}>
                      <Check size={10} />
                      <Text className="text-sm">{mobileMethod}</Text>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Text className="text-xs text-gray-400">
              Once your payment is verified, your e-ticket and receipt will be
              sent to registered email address.
            </Text>
            <div className="flex w-full content-end justify-start gap-14">
              <Button
                type="button"
                variant="outline"
                className="h-14 w-40 rounded-xl py-4 text-black"
              >
                See Order List
              </Button>
            </div>
          </div>
        </>
      ) : (
        <form
          id="stripe-form"
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col gap-10"
        >
          <PaymentElement />
          <div className="flex w-full content-end justify-start gap-14">
            <Button
              type="submit"
              variant="primary"
              className="h-14 w-40 rounded-xl bg-primary-500 py-4 text-white"
            >
              {loading ? "Processing..." : "Complete Payment"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-14 w-40 rounded-xl py-4 text-black"
            >
              See Order List
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MethodDetails;
