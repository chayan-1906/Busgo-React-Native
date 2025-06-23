import {IFilterOption} from '@/types';

export const tabs: IFilterOption[] = [
    {
        label: 'All',
        value: 'All',
    },
    {
        label: 'Upcoming',
        value: 'Upcoming',
    },
    {
        label: 'Completed',
        value: 'Completed',
    },
    {
        label: 'Cancelled',
        value: 'Cancelled',
    },
];

export const busTags: IFilterOption[] = [
    {label: 'A/C', value: 'AC'},
    {label: 'Non A/C', value: 'Non-AC'},
    {label: 'Sleeper', value: 'Sleeper'},
    {label: 'Seater', value: 'Seater'},
    {label: 'Luxury', value: 'Luxury'},
    {label: 'Semi-Sleeper', value: 'Semi-Sleeper'},
    {label: 'Volvo', value: 'Volvo'},
    {label: 'Mini Bus', value: 'Mini'},
    {label: 'Express', value: 'Express'},
    {label: 'Government', value: 'Govt'},
    {label: 'Private', value: 'Private'},
];

export const sortByOptions: IFilterOption[] = [
    {label: 'Departure Time', value: 'departureTime'},
    {label: 'Arrival Time', value: 'arrivalTime'},
    {label: 'Duration', value: 'duration'},
    {label: 'Rating', value: 'rating'},
    {label: 'Reviews', value: 'reviews'},
    {label: 'Available Seats', value: 'availableSeats'},
    {label: 'Price', value: 'price'},
    {label: 'Company', value: 'company'},
];

export const screens = {
    splashScreen: 'SplashScreen',
    loginScreen: 'LoginScreen',
    homeScreen: 'HomeScreen',
    busListScreen: 'BusListScreen',
    seatSelectionScreen: 'SeatSelectionScreen',
};

export const storage = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
};
