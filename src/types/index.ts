export interface IDecodedToken {
    exp: number;
}

export interface ISeat {
    seatId: number;
    seatType: 'window' | 'side' | 'path';
    isBooked: boolean;
}

export interface IBus {
    busId: string;
    busExternalId: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    availableSeats: number;
    price: number;
    originalPrice: number;
    company: string;
    busType: string;
    rating: number;
    totalReviews: number;
    badges: string[];
    seats: ISeat[][];
}

export interface ITicket {
    ticketId: string;
    ticketExternalId: string;
    userId: string;
    userExternalId: string;
    busId: string;
    busExternalId: string;
    date: string;
    seatNumbers: number[];
    totalFare: number;
    status: 'Upcoming' | 'Completed' | 'Cancelled';
    bookedAt: Date;
    pnr: string;
}

// https://claude.ai/chat/04d64419-bccd-48fa-809a-9032966fab41
/*export interface IPopulatedTicket {
    ticketId: string;
    ticketExternalId: string;
    userId: string;
    userExternalId: string;
    date: string;
    seatNumbers: number[];
    totalFare: number;
    status: 'Upcoming' | 'Completed' | 'Cancelled';
    bookedAt: string;
    pnr: string;
    bus: IBus;
}*/
export interface IPopulatedTicket extends Omit<ITicket, 'busId' | 'busExternalId'> {
    bus: IBus;
}
