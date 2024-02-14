import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <div className="mb-8">
      <Accordion type="multiple" className="grid gap-6">
        <AccordionItem
          value="item-1"
          className="rounded-lg border-0 bg-white px-3 shadow"
        >
          <AccordionTrigger className="text-sm font-medium">
            1. How can I order?
          </AccordionTrigger>
          <AccordionContent>
            You can order easily using our online platform. When you find a
            flight you need, you can add it to cart, login and go through the
            ordering process. After the order is ready, you will receive order
            summary to your email. Order summary will also be stored to your
            account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="rounded-lg border-0 bg-white px-3 shadow"
        >
          <AccordionTrigger className="text-sm font-medium">
            2. Can I cancel my order?
          </AccordionTrigger>
          <AccordionContent>
            To cancel your order, please contact our customer support team as
            soon as possible. Provide them with your order details, and they
            will guide you through the cancellation process. Keep in mind that
            cancellation policies may vary, so it's advisable to check the terms
            and conditions associated with your specific order.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="rounded-lg border-0 bg-white px-3 shadow"
        >
          <AccordionTrigger className="text-sm font-medium">
            3. What if my flight delayed?
          </AccordionTrigger>
          <AccordionContent>
            In the event of a flight delay, we understand the inconvenience it
            may cause. Please reach out to our customer support with your
            booking information, and they will assist you in managing any
            necessary changes or providing relevant information to minimize
            disruptions to your travel plans. We strive to offer flexible
            solutions to accommodate unforeseen circumstances.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-4"
          className="rounded-lg border-0 bg-white px-3 shadow"
        >
          <AccordionTrigger className="text-sm font-medium">
            4. What payment methods can I use?
          </AccordionTrigger>
          <AccordionContent>
            We accept a variety of payment methods to provide you with
            convenience and security. You can use major credit and debit cards,
            as well as other electronic payment options specified during the
            checkout process. Rest assured that our payment system is designed
            to ensure the safety of your financial transactions.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-5"
          className="rounded-lg border-0 bg-white px-3 shadow"
        >
          <AccordionTrigger className="text-sm font-medium">
            5. What information should I input when ordering?
          </AccordionTrigger>
          <AccordionContent>
            When placing an order, please ensure that you input accurate and
            complete information, including your shipping address, contact
            details, and any other required information specified during the
            checkout process. This ensures a smooth processing of your order and
            helps us deliver your products or services efficiently. If you have
            any specific questions about the information required, refer to the
            order form or contact our customer support for assistance.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
