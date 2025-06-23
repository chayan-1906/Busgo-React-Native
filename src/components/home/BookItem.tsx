import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {UserGroupIcon} from 'react-native-heroicons/solid';
import {BookingItemProps} from '@/types/props.ts';
import Sidebus from '../../assets/images/sidebus.png';
import TicketModal from '@/components/ui/modals/TicketModal.tsx';

function BookItem({bookItem}: BookingItemProps) {
    const [isTicketVisible, setIsTicketVisible] = useState(false);

    return (
        <View className={'p-4 mb-3 rounded-lg bg-gray-100'} style={{shadowColor: 'gray', shadowOffset: {width: 4, height: 2}, shadowOpacity: 0.6, shadowRadius: 2, elevation: 2}}>
            <View className={'flex-row justify-between'}>
                <View className={'flex-row gap-2 items-center'}>
                    <Image source={Sidebus} className={'size-6'} />
                    <Text className={'text-lg font-okra-bold'}>
                        {bookItem.bus?.from} → {bookItem.bus?.to}
                    </Text>
                </View>

                <Text className={'text-gray-500 font-okra-medium'}>{bookItem?.status}</Text>
            </View>

            <Text className={'text-sm text-gray-600 font-okra'}>{new Date(bookItem.date)?.toDateString()}</Text>
            <Text className={'text-sm text-gray-600 font-okra'}>
                {bookItem.bus.company} ({bookItem.bus?.busTags.join(', ')})
            </Text>
            <View className={'flex-row items-center mt-2'}>
                <UserGroupIcon size={18} color={'gray'} />
                <Text className={'ml-2 text-sm text-gray-600 font-okra'}>{bookItem.seatNumbers.join(', ')}</Text>
            </View>
            {bookItem.status === 'Cancelled' && <Text className={'mt-2 text-green-600 font-okra-medium'}>Refund completed</Text>}
            <TouchableOpacity onPress={() => setIsTicketVisible(true)} className={'mt-2 py-3 px-4 bg-tertiary rounded-lg'}>
                <Text className={'text-white text-center font-okra-bold'}>See Ticket</Text>
            </TouchableOpacity>

            <TicketModal isVisible={isTicketVisible} onClose={() => setIsTicketVisible(false)} bookingInfo={bookItem} />
        </View>
    );
}

export default BookItem;
