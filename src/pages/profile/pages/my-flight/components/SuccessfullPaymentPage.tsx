import { ChevronDown, ChevronLeft } from "lucide-react";
import PassangerDetails from "./containers/PassangerDetails";
import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { DirectBox } from "@/assets/svg";
import DetailRuteSuccess from "./containers/DetailRuteSuccess";
import CodeBooking from "./containers/CodeBooking";

const SuccessfullPayment = () => {

  const navigate = useNavigate();
  const handleOnClick = () => {
    console.log("hello");
    navigate('/profile/');
  }

  return(
    <section id="successfullPayment">
      <div className="grid grid-cols-3 mb-10 items-center">
        <label
          htmlFor="back"
          className="group flex items-center hover:text-primary-200 cursor-pointer"
        >
          <input
            type="button"
            id="back"
            name="back"
            onClick={handleOnClick}
          />
          <ChevronLeft size={20} />
        </label>
        
        <div className="flex flex-col text-center">
          <Text className="font-medium">Garuda Indonesia</Text>
          <Text className="text-xs">GA207 - Economy</Text>
          <Text className="text-xs font-normal text-gray-400 mt-3">Order ID:</Text>
        </div>

        <Button className="flex items-center justify-end">
          <DirectBox />
        </Button>
      </div>
      <div className="flex flex-col gap-8 mb-3">
        <CodeBooking />
        <DetailRuteSuccess />
        <PassangerDetails />
        <div className=" shadow-4xl bg-white px-4 py-5 flex flex-row justify-between">
          <div className="flex flex-row">
            <Text>Total Payment</Text>
            <ChevronDown className="text-primary-500" />
          </div>
          <Text className="text-primary-500 font-semibold">IDR 2,230,900</Text>
        </div>
      </div>
    </section>
  )
}

export default SuccessfullPayment;