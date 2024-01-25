import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose} from "@/components/ui/dialog";
import { Text } from "@mantine/core";
import Tiket from "../../../../assets/svg/ticket-discount.svg";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const PromoForm = () => {
  const [voucher, setVoucher] = useState<string>("");
  const [dialog, setDialog] = useState<boolean>(false);

  const handleDialog = () => {
    setDialog(!dialog);
  }

  const handleOnClick = (e:React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      promos: { value: string };
    };
    setVoucher(target.promos.value);
  }
  return (
    <div className="border-0 border-t p-4">
      <Text className="text-base">Use Promo</Text>
      <label
        htmlFor="promos"
        className="group flex items-center p-2 border rounded-lg mt-4 space-x-3 hover:text-primary-200"
      >
        <img src={Tiket} alt="" />
        {voucher !== "" ? (
          <Text className="grow text-gray-300 text-sm">
            {voucher}
          </Text>
        ) : (
          <Text className="grow text-gray-300 text-sm">
            See all promos/voucher codes
          </Text>
        )}
        <input type="button" id="promos" name="promos" onClick={handleDialog} />
      </label>

      <Dialog open={dialog} onOpenChange={handleDialog}>
        <DialogContent className="max-w-[623px] backdrop-blur-md sm:max-w-[623px]">
          <DialogHeader>
            <DialogTitle>Promo Codes and Vouchers</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleOnClick} className="flex flex-row items-center justify-between gap-3 rounded-lg">
            <Input
              id="promos"
              name="promos"
              type="text"
              placeholder="Input your code"
              autoCapitalize="none"
              autoComplete="on"
              autoCorrect="on"
              className="inline-flex h-10 items-center justify-start rounded-lg bg-gray-100 border-b border-dashed py-2.5 opacity-80"
            />
            <DialogClose asChild >
              <Button type="submit" className="rounded-xl bg-primary-500 py-4 mx-4 text-white">Use</Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PromoForm;