import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

import { useQuery } from "@tanstack/react-query";
import axiosFSW from "../axiosFSW";

import { ApiError } from "@/types/ApiError";
// import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "@/store/useCartStore";
import { usePassengerStore } from "@/store/useBookingStore";
import { useAddOnsStore } from "@/store/useAddOnsStore";
import { ICompleteBooking } from "@/types/Booking";
import { transformCartData, transformData } from "../dataformatter";
import { completeBooking } from '@/components/particles/completeBookingData';
import { calculateTotalPrice, summarizeBooking } from "../totalSummarizer";

export const usePaymentStripe = () => {
    const token = Cookies.get("otpData");
    const { booking_id } = useParams();

    const { mutateAsync, error, isPending } = useMutation({
        mutationKey: ["stripePayment"],
        mutationFn: async () => { // Load Stripe instance
            const response = await axiosFSW.post(`/user/payment/${booking_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const responseData = await response.data;
            return responseData;
        },
        onSuccess(data) {
            return data
        },
        onError(error: ApiError) { return error },
    });

    return { mutateAsync, error, isPending };
};

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

    const cartTicket = transformCartData(data);

    return { data, error, isFetching, cartTicket };
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

    const summary = summarizeBooking(completeBookingData, cart);

    const totalBooking = calculateTotalPrice(summary)

    const updatedCompleteBookingData = {
        ...completeBookingData,
        ticket_details: {
            ...completeBookingData.ticket_details,
            total_ticket_price: totalBooking
        }
    };

    return { updatedCompleteBookingData, totalBooking };
}