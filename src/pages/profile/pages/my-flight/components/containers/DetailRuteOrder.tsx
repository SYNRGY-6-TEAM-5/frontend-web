import ArrowCircle from "@/assets/ArrowCircleRight.png";
import { Text } from "@mantine/core";

const DetailRuteOrder = () => {
  return(
    <div className="shadow-3xl rounded-lg bg-white">
      <div className="bg-black rounded-t-lg text-white text-center flex justify-center space-x-5 p-1 items-center">
        <Text>YIA</Text>
        <img src={ArrowCircle}/>
        <Text>CGK</Text>
      </div>
      <div>
        <div>
          <div className="flex justify-between">
            <Text>Depart</Text>
            <Text>GA207</Text>
          </div>
          <div className="flex justify-between">
            <Text>Fri, 19 Jan 2024</Text>
            <Text>06:25 AM</Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailRuteOrder