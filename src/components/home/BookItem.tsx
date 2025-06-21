import {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {BookingItemProps} from '@/types/props.ts';
import {UserGroupIcon} from 'react-native-heroicons/solid';
import TicketModal from '@/components/ui/modals/TicketModal.tsx';

function BookItem({bookItem}: BookingItemProps) {
    const [isTicketVisible, setIsTicketVisible] = useState(false);

    return (
        <View className={'p-4 mb-3 rounded-lg bg-gray-100'}>
            <View className={'flex-row justify-between'}>
                <Image source={require('../../assets/images/sidebus.png')} className={'size-6'} />
                <Text className={'text-gray-500'}>{bookItem?.status}</Text>
            </View>

            <Text className={'text-lg font-okra font-semibold'}>
                {bookItem.bus?.from} → {bookItem.bus?.to}
            </Text>
            <Text className={'text-gray-600 font-okra'}>{new Date(bookItem.date)?.toDateString()}</Text>
            <Text className={'text-gray-600 font-okra'}>{bookItem.bus?.busType}</Text>
            <View className={'flex-row items-center mt-2'}>
                <UserGroupIcon size={18} color={'gray'} />
                <Text className={'ml-2 text-gray-600'}>{bookItem.seatNumbers?.toString()}</Text>
            </View>
            {bookItem.status === 'Cancelled' && <Text className={'mt-2 text-green-600 font-okra font-semibold'}>Refund completed</Text>}
            <TouchableOpacity onPress={() => setIsTicketVisible(true)} className={'mt-2 py-2 px-4 bg-red-500 rounded-lg'}>
                <Text className={'text-white text-center font-okra font-semibold'}>See Ticket</Text>
            </TouchableOpacity>

            {/*{isTicketVisible && <TicketModal isVisible={isTicketVisible} onClose={() => setIsTicketVisible(false)} bookingInfo={bookItem} />}*/}
            <TicketModal isVisible={isTicketVisible} onClose={() => setIsTicketVisible(false)} bookingInfo={bookItem} />
        </View>
    );
}

export default BookItem;
