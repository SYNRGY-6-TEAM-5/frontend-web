import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import axiosFSW from "../axiosFSW";
import { handleApiError } from "../errorApiHandler";

import { ApiError } from "@/types/ApiError";
import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "@/store/useCartStore";
import { usePassengerStore } from "@/store/useBookingStore";
import { useAddOnsStore } from "@/store/useAddOnsStore";
import { ICompleteBooking } from "@/types/Booking";
import { transformData } from "../dataformatter";
import { completeBooking } from '@/components/particles/completeBookingData';

export const usePaymentStripe = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const token = Cookies.get("otpData");
    const { booking_id } = useParams();

    const { mutateAsync, error, isPending } = useMutation({
        mutationKey: ["stripePayment"],
        mutationFn: async (data: any) => {
            const stripe = await loadStripe("your-publishable-key"); // Load Stripe instance
            const response = await axiosFSW.post(`/user/payment/${booking_id}`, data, { // Use extracted booking_id
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const responseData = await response.data;

            const session = responseData.session_id;

            if (stripe) {
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });
                if (result.error) {
                    console.log(result.error);
                }
            } else {
                console.error('Stripe instance is null');
            }

            return response;
        },
        onSuccess(data) {
            if (data.status === 200) {
                navigate("/profile/order");
            }
        },
        onError: (error: ApiError) => handleApiError(error, toast),
    });

    return { mutateAsync, error, isPending };
};

// export const useFetchBooking = () => {
//     const { toast } = useToast();
//     const token = Cookies.get("accesstoken");
//     const [fetchedBooking, setFetchedBooking] = useState<ICompleteBooking>(completeBooking)

//     const { mutateAsync, error, isPending } = useMutation({
//         mutationKey: ["userBooking"],
//         mutationFn: async (bookingId: number) => {
//             const response = await axiosFSW.get(`/user/booking/${bookingId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             return response.data;
//         },
//         onSuccess(data) {
//             console.log("data >>> ", data);
//             if (data.status === 200) {
//                 const formattedData = transformData(data.data);
//                 console.log("Formatted Data:", formattedData);
//                 setFetchedBooking(formattedData)
//             }
//         },
//         onError: (error: ApiError) => handleApiError(error, toast),
//     });

//     return { mutateAsync, error, isPending, fetchedBooking };
// };

export const useFetchBooking = (bookingId: number | null) => {
    const token = Cookies.get("accesstoken");
    const { data = completeBooking, error, isFetching } = useQuery({
        queryKey: ["userBooking", bookingId], // Include bookingId in the queryKey
        queryFn: async () => {
            const response = await axiosFSW.get(`/user/booking/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const formattedData = transformData(response.data.data[0]);
            return formattedData;
        },
        refetchOnWindowFocus: false,
    });

    return { data, error, isFetching };
};

export const useSavedBooking = () => {
    const { cart, totalFare } = useCartStore();
    const {
        contactDetails,
        passengerDetails,
    } = usePassengerStore();
    const { personAddOns, tripInsurance } = useAddOnsStore();

    const lastArrivalScheduledTime = cart[cart.length - 1].flight.arrival.scheduled_time;
    const completeBookingData: ICompleteBooking = {
        ticket_details: {
            booked_ticket: cart.map(ticket => ticket.ticket_id),
            total_ticket_price: totalFare(),
            expired_time: new Date(lastArrivalScheduledTime),
        },
        contact_details: contactDetails,
        passenger_details: passengerDetails,
        passenger_addOns: personAddOns,
        trip_insurance: tripInsurance,
    };

    return { completeBookingData };
}