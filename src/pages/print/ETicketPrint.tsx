import { MainLogo } from "@/assets/svg";
import { useGetDetailUserBooking } from "@/lib/hooks/useProfileBooking";
import { useParams } from "react-router-dom";
import ETicketFlightCard from "./components/FlightCard";
import LoadingScreen from "./components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { FileDown, Printer } from "lucide-react";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import { toJpeg } from "html-to-image";

const ETicketPrint = () => {
  const { id } = useParams();

  const { data, isFetching } = useGetDetailUserBooking(id);
  const refPrint = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => refPrint.current,
  });

  const downloadPDF = async () => {
    if (refPrint.current) {
      await toJpeg(refPrint.current, {
        canvasWidth: 2480,
        canvasHeight: 3508,
      }).then(function (dataUrl) {
        const pdf = new jsPDF();
        pdf.addImage(dataUrl, "JPEG", 0, 0, 210, 300);
        pdf.save(`E-Ticket-${data?.booking_code || "AERSWFT"}.pdf`);
      });
    }
  };

  useEffect(() => {
    if (data) {
      handlePrint();
    }
  }, [data]);

  return isFetching ? (
    <LoadingScreen />
  ) : (
    <div className="flex justify-center bg-gray-100">
      <div className="my-10 grid w-[595px]">
        <div className="ml-auto flex gap-2">
          <Button
            variant="primary"
            type="button"
            className="mb-4 h-8 rounded-md p-0 px-2 text-xs"
            onClick={downloadPDF}
          >
            <FileDown className="me-[6px] w-3" />
            Download as PDF
          </Button>
          <Button
            variant="primary"
            type="button"
            className="mb-4 h-8 rounded-md p-0 px-4 text-xs"
            onClick={handlePrint}
          >
            <Printer className="me-[6px] w-3" />
            Print
          </Button>
        </div>
        <div className="flex min-h-[842px] flex-col bg-white" ref={refPrint}>
          <div className="flex items-center justify-between border-b border-gray-200 px-[40px] py-4">
            <div>
              <div className="flex items-center">
                <MainLogo className="h-[30px] w-[30px]" />
                <div className="ms-[6px] text-lg font-medium tracking-tighter">
                  Aero Swift
                </div>
              </div>
              <div className="mt-2 text-[8px] leading-snug">
                Soar to New Heights and <br /> Cultivate Expertise
              </div>
            </div>
            <div>
              <div className="text-[10px] font-medium">Your Booking Code</div>
              <div className="mt-1 w-full rounded-[4px] border-b-2 border-black bg-primary-500 py-1 text-center text-xs font-medium text-white">
                {data?.booking_code
                  ? data.booking_code.replace("AERSWFT", "")
                  : "AERSWFT"}
              </div>
            </div>
          </div>
          <div className="mt-5 text-center">
            <p className="text-sm font-medium">Flight Planning</p>
            <p className="text-[10px] text-black/50">
              Order ID: {data?.booking_id}
            </p>
          </div>
          <div className="mt-4 flex gap-5 px-[40px]">
            <div className="flex w-1/3 items-center">
              <div className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-primary-500 text-[10px] text-white">
                1
              </div>
              <p className="ms-2 text-[10px] leading-tight text-black/50">
                Show E-Ticket and valid ID at Check-In
              </p>
            </div>
            <div className="flex w-1/3 items-center">
              <div className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-primary-500 text-[10px] text-white">
                2
              </div>
              <p className="ms-2 text-[10px] leading-tight text-black/50">
                Check-in no later than 90 minutes before departure
              </p>
            </div>
            <div className="flex w-1/3 items-center">
              <div className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-primary-500 text-[10px] text-white">
                3
              </div>
              <p className="ms-2 text-[10px] leading-tight text-black/50">
                Adjust the time to the time at the local airport
              </p>
            </div>
          </div>
          <div className="mt-[20px] grid divide-y divide-dashed px-[40px]">
            {data?.tickets.map((ticket, index) => (
              <ETicketFlightCard ticket={ticket} index={index} key={index} />
            ))}
          </div>
          <div className="mt-[20px] px-[40px]">
            <p className="py-2 text-xs font-semibold">Passenger Details</p>

            <div className="relative overflow-hidden rounded-md border">
              <table className="w-full border-collapse text-left text-xs">
                <thead className="border-b text-xs">
                  <tr>
                    <th scope="col" className="border-e p-2 font-medium">
                      No
                    </th>
                    <th scope="col" className="border-e p-2 font-medium">
                      Passenger
                    </th>
                    <th scope="col" className="border-e p-2 font-medium">
                      ID
                    </th>
                    <th scope="col" className="border-e p-2 font-medium">
                      Flight Number
                    </th>
                    <th scope="col" className="p-2 font-medium">
                      Ticket Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.passengers.map((pers, index) => (
                    <tr
                      className="border-b bg-white last:border-none hover:bg-gray-50"
                      key={index}
                    >
                      <th className="border-r p-2 font-normal">{index + 1}</th>
                      <td className="border-r p-2">{pers.name}</td>
                      <td className="border-r p-2">{pers.nik}</td>
                      <td className="border-r p-2">
                        {data.tickets[0].flight.iata}
                      </td>
                      <td className="p-2">{pers.booking_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-auto flex w-full items-center justify-between bg-gray-50 px-[40px] py-4">
            <div>
              <div className="flex items-center">
                <MainLogo className="h-[22px] w-[22px]" />
                <p className="ms-1 text-xs font-medium leading-none tracking-tighter">
                  Aero Swift
                </p>
              </div>
              <p className="mt-2 text-[8px]">
                Jl. Melati Jakarta Pusat, Margonda, No. 829, 72811
              </p>
            </div>
            <div className="flex items-center">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3333 2.58337H4.66659C2.66659 2.58337 1.33325 3.58337 1.33325 5.91671V10.5834C1.33325 12.9167 2.66659 13.9167 4.66659 13.9167H11.3333C13.3333 13.9167 14.6666 12.9167 14.6666 10.5834V5.91671C14.6666 3.58337 13.3333 2.58337 11.3333 2.58337ZM11.6466 6.64337L9.55992 8.31004C9.11992 8.66337 8.55992 8.83671 7.99992 8.83671C7.43992 8.83671 6.87325 8.66337 6.43992 8.31004L4.35325 6.64337C4.13992 6.47004 4.10659 6.15004 4.27325 5.93671C4.44659 5.72337 4.75992 5.68337 4.97325 5.85671L7.05992 7.52337C7.56659 7.93004 8.42659 7.93004 8.93325 7.52337L11.0199 5.85671C11.2333 5.68337 11.5533 5.71671 11.7199 5.93671C11.8933 6.15004 11.8599 6.47004 11.6466 6.64337Z"
                  fill="#111111"
                />
              </svg>

              <p className="ms-1 text-xs font-medium text-primary-500">
                help@aero.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETicketPrint;
