import { Text } from "@mantine/core";
import { ChevronRightIcon } from "@radix-ui/react-icons";

interface SelectItemProps {
    name: string;
    user_name: string;
    index: number;
};

const SelectItem: React.FC<SelectItemProps> = ({ name, user_name, index }) => {

    return (
        <>
            <div key={index} className="mt-1 flex h-full w-full items-center justify-between border-b py-2 pb-4">
                <div className="mt-1 flex w-full flex-col items-start justify-between gap-1">
                    <Text className="text-lg font-normal">{name}</Text>
                    {user_name === name && (
                        <Text className="text-md font-medium text-slate-300">
                            Account Owner
                        </Text>
                    )}
                </div>
                <ChevronRightIcon
                    fontSize={12}
                    className="h-6 w-6 text-xl font-normal text-primary-500"
                />
            </div>
        </>
    );
};

export default SelectItem;
