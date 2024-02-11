import PassengerAddForm from "./component/containers/AddPassengerForm";
import SelectPassenger from "./component/containers/SelectPassenger"
import PassengerUpdateForm from "./component/containers/UpdatePassengerForm";
import { useSavedPassengerStore } from "@/store/usePassengerStore";

const Passenger = () => {
  const { selected_passenger_id, isAddingPassenger } = useSavedPassengerStore();

  console.log("selected_passenger_id: ", selected_passenger_id)

  return (
    <div>
      {isAddingPassenger ? (
        <PassengerAddForm saved_passenger_id={1} />
      ) : (
        selected_passenger_id !== 0 &&
          selected_passenger_id !== null &&
          selected_passenger_id !== undefined ? (
          <PassengerUpdateForm saved_passenger_id={selected_passenger_id} />
        ) : (
          <SelectPassenger />
        )
      )}
    </div>

  )
}

export default Passenger