import { Text } from "@mantine/core"
import PromoForm from "../form/PromoForm"

const Promo = () => {
  return(
    <div className="border-0 border-t p-4">
      <Text className="text-base">Use Promo</Text>
      <PromoForm />
    </div>
  )
}

export default Promo