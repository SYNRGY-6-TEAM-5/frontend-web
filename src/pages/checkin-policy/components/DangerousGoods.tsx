import { Text } from "@mantine/core";

const DangerousGoods = () => {
  return (
    <div className="mt-2">
      <Text className=" w-fit text-base font-medium leading-6">
        Dangerous Goods
      </Text>
      <div className="py-3">
        <div className="flex items-start">
          <Text className="text-xs font-normal">
            For safety reasons, airlines prohibit or restrict the following
            items from being carried in cabin baggage or checked baggage.
          </Text>
        </div>
        <div className="mt-4 flex items-start">
          <span className="text-xs font-normal">&#8226;</span>
          <Text className="ml-2 text-xs  font-normal">Compressed gas</Text>
        </div>
        <div className="mt-2 flex items-start">
          <span className="text-xs font-normal">&#8226;</span>
          <Text className="ml-2 text-xs font-normal">Flammable substances</Text>
        </div>
        <div className="mt-2 flex items-start">
          <span className="text-xs font-normal">&#8226;</span>
          <Text className="ml-2 text-xs font-normal">Poisonous substances</Text>
        </div>
        <div className="mt-2 flex items-start">
          <span className="text-xs font-normal">&#8226;</span>
          <Text className="ml-2 text-xs font-normal">
            Dry and wet batteries
          </Text>
        </div>
        <div className="mt-2 flex items-start">
          <span className="text-xs font-normal">&#8226;</span>
          <Text className="ml-2 text-xs font-normal">
            Biohazards (e.g. bacteria, viruses)
          </Text>
        </div>
        <div className="mt-2 flex items-start">
          <span className="text-xs font-normal">&#8226;</span>
          <Text className="ml-2 text-xs font-normal">
            Explosives and fireworks
          </Text>
        </div>
        <div className="mt-2 flex items-start">
          <span className="text-xs font-normal">&#8226;</span>
          <Text className="ml-2 text-xs font-normal">
            Radioactive substances
          </Text>
        </div>
        <div className="mt-2 flex items-start">
          <span className="text-xs font-normal">&#8226;</span>
          <Text className="ml-2 text-xs font-normal">
            Other hazardous materials
          </Text>
        </div>
      </div>
    </div>
  );
};

export default DangerousGoods;
