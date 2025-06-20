export interface IDecodedToken {
    exp: number;
}

export interface ITicket {
    ticketId: string;
    ticketExternalId: string;
    userId: string;
    userExternalId: string;
    busId: string;
    busExternalId: string;
    date: Date;
    seatNumbers: number[];
    totalFare: number;
    status: 'Upcoming' | 'Completed' | 'Cancelled';
    bookedAt: Date;
    pnr: string;
}
