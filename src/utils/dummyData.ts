type Bus = {
    busId: string;
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
};

interface Seat {
    seatId: number;
    isBooked: boolean;
    seatType: 'window' | 'side' | 'path';
}

interface Seats {
    rowId: number;
    seats: Seat[];
}

export const busBookings = [
    {
        id: '1',
        from: 'Prayagraj (Uttar Pradesh)',
        to: 'Lucknow',
        date: '09 Feb 2025, 16:00',
        type: 'Bus - UPSRTC',
        status: 'Cancelled',
        passengers: 3,
    },
    {
        id: '2',
        from: 'Lucknow',
        to: 'Prayagraj (Uttar Pradesh)',
        date: '08 Feb 2025, 20:30',
        type: 'Bus - UPSRTC',
        status: 'Cancelled',
        passengers: 3,
    },
    {
        id: '3',
        from: 'Delhi',
        to: 'Agra',
        date: '15 April 2025, 10:00',
        type: 'Bus - Private',
        status: 'Upcoming',
        passengers: 2,
    },
    {
        id: '4',
        from: 'Mumbai',
        to: 'Pune',
        date: '05 March 2025, 12:30',
        type: 'Bus - MSRTC',
        status: 'Completed',
        passengers: 1,
    },
];

export const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];

export const busInfo = {
    busId: 'bus_001',
    departureTime: '20:00',
    arrivalTime: '05:30',
    duration: '9h 30m',
    availableSeats: 6,
    price: 949,
    originalPrice: 999,
    company: 'Sethi Yatra Company',
    busType: 'A/C Seater / Sleeper (2+1)',
    rating: 4.6,
    totalReviews: 846,
    badges: ['Highly rated by women', 'New Bus'],
};

export const locations = ['Lucknow', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Jaipur', 'Ahmedabad', 'Indore', 'Surat', 'Nagpur', 'Patna', 'Bhopal', 'Chandigarh', 'Goa', 'Visakhapatnam', 'Guwahati', 'Ranchi'];

export const buses: Bus[] = [
    {
        busId: 'bus_001',
        departureTime: '20:00',
        arrivalTime: '05:30',
        duration: '9h 30m',
        availableSeats: 6,
        price: 949,
        originalPrice: 999,
        company: 'Sethi Yatra Company',
        busType: 'A/C Seater / Sleeper (2+1)',
        rating: 4.6,
        totalReviews: 846,
        badges: ['Highly rated by women', 'New Bus'],
    },
    {
        busId: 'bus_002',
        departureTime: '21:30',
        arrivalTime: '06:45',
        duration: '9h 15m',
        availableSeats: 11,
        price: 949,
        originalPrice: 999,
        company: 'Sethi Yatra Company',
        busType: 'A/C Sleeper (2+1)',
        rating: 4.6,
        totalReviews: 682,
        badges: ['Highly rated by women', '4 Women Traveling'],
    },
];

export const seats: Seats[] = [
    {
        rowId: 1,
        seats: [
            {
                seatId: 1,
                seatType: 'window',
                isBooked: false,
            },
            {
                seatId: 2,
                seatType: 'path',
                isBooked: false,
            },
            {
                seatId: 3,
                seatType: 'side',
                isBooked: false,
            },
            {
                seatId: 4,
                seatType: 'side',
                isBooked: false,
            },
        ],
    },
    {
        rowId: 2,
        seats: [
            {
                seatId: 5,
                seatType: 'window',
                isBooked: false,
            },
            {
                seatId: 6,
                seatType: 'path',
                isBooked: false,
            },
            {
                seatId: 7,
                seatType: 'side',
                isBooked: false,
            },
            {
                seatId: 8,
                seatType: 'side',
                isBooked: false,
            },
        ],
    },
    {
        rowId: 3,
        seats: [
            {
                seatId: 9,
                seatType: 'window',
                isBooked: false,
            },
            {
                seatId: 10,
                seatType: 'path',
                isBooked: false,
            },
            {
                seatId: 11,
                seatType: 'side',
                isBooked: false,
            },
            {
                seatId: 12,
                seatType: 'side',
                isBooked: false,
            },
        ],
    },
    {
        rowId: 4,
        seats: [
            {
                seatId: 13,
                seatType: 'window',
                isBooked: false,
            },
            {
                seatId: 14,
                seatType: 'path',
                isBooked: false,
            },
            {
                seatId: 15,
                seatType: 'side',
                isBooked: false,
            },
            {
                seatId: 16,
                seatType: 'side',
                isBooked: false,
            },
        ],
    },
    {
        rowId: 5,
        seats: [
            {
                seatId: 17,
                seatType: 'window',
                isBooked: false,
            },
            {
                seatId: 18,
                seatType: 'path',
                isBooked: false,
            },
            {
                seatId: 19,
                seatType: 'side',
                isBooked: false,
            },
            {
                seatId: 20,
                seatType: 'side',
                isBooked: false,
            },
        ],
    },
    {
        rowId: 6,
        seats: [
            {
                seatId: 21,
                seatType: 'window',
                isBooked: false,
            },
            {
                seatId: 22,
                seatType: 'path',
                isBooked: false,
            },
            {
                seatId: 23,
                seatType: 'side',
                isBooked: false,
            },
            {
                seatId: 24,
                seatType: 'side',
                isBooked: false,
            },
        ],
    },
    {
        rowId: 7,
        seats: [
            {
                seatId: 25,
                seatType: 'window',
                isBooked: false,
            },
            {
                seatId: 26,
                seatType: 'side',
                isBooked: false,
            },
            {
                seatId: 27,
                seatType: 'side',
                isBooked: false,
            },
            {
                seatId: 28,
                seatType: 'side',
                isBooked: false,
            },
        ],
    },
];
