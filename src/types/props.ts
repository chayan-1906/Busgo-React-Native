import {IPopulatedTicket} from '@/types/index.ts';

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
    bookingInfo: IPopulatedTicket;
}
