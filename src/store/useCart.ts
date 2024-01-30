import { create } from 'zustand';
import { Ticket } from '@/types/Ticket';

interface CartItem extends Ticket {
    count: number;
}

type CartStore = {
    cart: CartItem[];
    count: () => number;
    totalFare: () => number;
    add: (ticket: Ticket, tripType: string) => void;
    remove: (idTicket: number) => void;
    removeAll: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
    cart: [],
    totalFare: () => {
        const { cart } = get();
        if (cart.length)
            return get().cart.reduce((total, item) => total + parseFloat(item.fare_amount), 0)
        return 0;
    },
    count: () => {
        const { cart } = get();
        if (cart.length)
            return cart.map(item => item.count).reduce((prev, curr) => prev + curr);
        return 0;
    },
    add: (ticket: Ticket, tripType: string) => {
        const { cart } = get();
        const updatedCart = updateCart(ticket, cart, tripType);
        set({ cart: updatedCart });
    },
    remove: (idTicket: number) => {
        const { cart } = get();
        const updatedCart = removeCart(idTicket, cart);
        set({ cart: updatedCart });
    },
    removeAll: () => set({ cart: [] }),
}));

function updateCart(ticket: Ticket, cart: CartItem[], tripType: string): CartItem[] {
    const cartItem = { ...ticket, count: 1 } as CartItem;

    const ticketOnCart = cart.some(item => item.ticket_id === ticket.ticket_id);

    if (ticketOnCart) {
        console.log(`Ticket with ID ${ticket.ticket_id} already exists in the cart.`);
        return cart;
    }

    if (tripType === "one-way" && cart.length >= 1) {
        console.log("One-way trip: Can only hold 1 item in cart");
        return cart;
    } else if (tripType === "roundtrip" && cart.length >= 2) {
        console.log("Roundtrip: Can only hold 2 items in cart");
        return cart;
    } else {
        cart.push(cartItem);
    }

    return cart;
}

function removeCart(idTicket: number, cart: CartItem[]): CartItem[] {
    return cart.map(item => {
        if (item.ticket_id === idTicket)
            return { ...item, count: item.count - 1 };
        return item;
    }).filter(item => item.count);
}
