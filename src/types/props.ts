import {ITicket} from '@/types/index.ts';

export interface BookingItemProps {
    bookItem: ITicket;
}

export interface DatePickerModalProps {
    isVisible: boolean;
    onClose: () => void;
    onConfirm: (date: Date) => void;
    selectedDate: Date;
}
