import {useState} from 'react';
import {Platform, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ClockIcon, UserGroupIcon} from 'react-native-heroicons/solid';
import {BookingItemProps} from '@/types/props.ts';
import TicketModal from '@/components/ui/modals/TicketModal.tsx';

function BookItem({bookItem}: BookingItemProps) {
    const [isTicketVisible, setIsTicketVisible] = useState(false);

    const statusBadgeColor = (status: string) => {
        if (status === 'Upcoming') {
            return 'bg-primary';
        } else if (status === 'Completed') {
            return 'bg-emerald-500';
        } else if (status === 'Cancelled') {
            return 'bg-tertiary';
        } else {
            return 'bg-slate-600';
        }
    };

    return (
        <View className={'mb-4'}>
            <LinearGradient colors={['#CF3239', '#FDBB8A']} start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}} style={{shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.2, shadowRadius: 5, elevation: 6, borderRadius: 12, padding: 2}}>
                <View className={'bg-white/80 m-[1px] rounded-xl p-4'}>
                    {/** DateTime & Status */}
                    <View className={'flex-row justify-between items-center mb-2'}>
                        <View className={'flex-row items-center'}>
                            <ClockIcon size={16} color={'#CF3239'} />
                            {/*<Text className={'ml-2 text-gray-800 font-okra text-sm'}>{new Date(bookItem.date).toDateString()}</Text>*/}
                            <Text className={'ml-2 text-gray-800 font-okra text-sm'}>
                                {new Date(bookItem.bus.departureTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} -{' '}
                                {new Date(bookItem.bus.arrivalTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                                , {new Date(bookItem.date!).toDateString()}
                            </Text>
                        </View>

                        <View className={`${statusBadgeColor(bookItem.status)} px-3 py-1 rounded-full`}>
                            <Text className={'text-white text-xs font-okra-bold'}>{bookItem.status}</Text>
                        </View>
                    </View>

                    {/** Route */}
                    <Text className={'text-xl font-okra-bold text-gray-900'}>
                        {bookItem.bus?.from} → {bookItem.bus?.to}
                    </Text>

                    {/** Company details */}
                    <Text className={'text-gray-700 font-okra-medium mt-1'}>{bookItem.bus.company}</Text>
                    <Text className={'text-gray-600 text-sm font-okra'}>{bookItem.bus?.busTags.join(', ')}</Text>

                    {/** Seats */}
                    <View className={'flex-row items-center mt-3'}>
                        <UserGroupIcon size={16} color={'#CF3239'} />
                        <Text className={'ml-2 text-sm text-gray-600 font-okra'}>Seat(s): {bookItem.seatNumbers.join(', ')}</Text>
                    </View>

                    {/** View Details button */}
                    <TouchableOpacity onPress={() => setIsTicketVisible(true)} className={'mt-4 bg-tertiary rounded-lg py-3'}>
                        <Text className={'text-white text-center font-okra-bold'}>View Details</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <TicketModal isVisible={isTicketVisible} onClose={() => setIsTicketVisible(false)} bookingInfo={bookItem} />

            <SafeAreaView className={`${Platform.OS === 'android' && 'mb-4'}`} />
        </View>
    );
}

export default BookItem;
