import {
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { useSavedPassengerStore } from "@/store/usePassengerStore";
import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface FormHeaderProps {
    passengerName: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ passengerName }) => {
    const { selected_passenger_id, isAddingPassenger, setSelectedPassengerId, setIsAddingPassenger } = useSavedPassengerStore();
    return (
        <div className="w-full flex h-16 items-start justify-start">
            <Link to="#" onClick={() => { setSelectedPassengerId(0); setIsAddingPassenger(false); }}>
                <ArrowLeft size={20} className="text-primary-500" />
            </Link>
            <div className="w-full flex flex-col h-16 items-center justify-center gap-2">
                <CardTitle>{selected_passenger_id !== 0 && !isAddingPassenger ? `${passengerName}` : "Add new Passanger" }</CardTitle>
                <CardDescription>
                {selected_passenger_id !== 0 && !isAddingPassenger ? "Details of selected passengers details" : "Add new Passanger by filling form below" }
                </CardDescription>
            </div>
        </div>
    );
};

export default FormHeader;
