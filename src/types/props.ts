import {IFilterOption, IPopulatedTicket, ISeat} from '@/types/index.ts';

export interface BookingItemProps {
    bookItem: IPopulatedTicket;
}

export interface DatePickerModalProps {
    isVisible: boolean;
    onClose: () => void;
    onConfirm: (date: Date) => void;
    selectedDate: Date;
}

export interface LocationPickerModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSelect: (location: string, type: 'from' | 'to') => void;
    type: 'from' | 'to';
    fromLocation?: string;
}

export interface TicketModalProps {
    isVisible: boolean;
    onClose: () => void;
    bookingInfo: Partial<IPopulatedTicket>;
}

export interface PaymentButtonProps {
    noOfSeats: number;
    price: number;
    onPay: () => void;
}

export interface SeatProps {
    seats: ISeat[][];
    // seats: [ISeat[]];
    onSeatSelect: (seatId: number) => void;
    selectedSeats: number[];
}

interface SingleSelectProps {
    options: IFilterOption[];
    selectedOption: IFilterOption;
    setSelectedOption: (value: IFilterOption) => void;
    multi?: false;
    className?: string;
}

interface MultiSelectProps {
    options: IFilterOption[];
    selectedOption: IFilterOption[];
    setSelectedOption: (value: IFilterOption[]) => void;
    multi: true;
    className?: string;
}

export type FilterProps = SingleSelectProps | MultiSelectProps;
