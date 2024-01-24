import { Text } from "@mantine/core"
import { ChevronDown } from "lucide-react"

const Total = () => {
  return(
    <div className="border-0 border-t p-4">
      <label
        htmlFor="details"
        className="group flex items-center hover:text-primary-200"
      >
        <Text className="text-lg">Total</Text>
        <input
          type="button"
          id="details"
          name="details"
        />
        <ChevronDown size={20} className="font-base text-primary-500" />
        <Text className="grow text-right text-primary-500">IDR 2,230,900</Text>
      </label>
    </div>
  )
}

export default Total;