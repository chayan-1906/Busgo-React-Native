import {Image, Text, TouchableOpacity, View} from 'react-native';
import {navigate} from '@/utils/NavigationUtils.ts';
import {screens} from '@/utils/constants.ts';
import {IBus} from '@/types';

function BusItem({item: bus}: {item: IBus}) {
    return (
        <TouchableOpacity onPress={() => navigate(screens.seatSelectionScreen, {busExternalId: bus.busExternalId})} className={'mb-4 p-4 rounded-lg shadow-sm bg-white'}>
            <View className={'flex-row gap-2 items-center'}>
                <Image source={require('../../assets/images/sidebus.png')} className={'size-8'} />
                <Text className={'text-lg text-gray-900 font-okra-bold'}>{bus.company}</Text>
            </View>
            <Text className={'text-sm text-gray-500 font-okra-medium'}>{bus.busTags.join(', ')}</Text>

            <View className={'flex-row justify-between'}>
                <Text className={'text-base text-gray-700 font-okra-medium'}>
                    {new Date(bus.departureTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} -{' '}
                    {new Date(bus.arrivalTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>
                <Text className={'text-sm text-gray-500 font-okra'}>{bus.duration}</Text>
            </View>

            <View className={'flex-row justify-between items-center mt-2'}>
                <View>
                    <Text className={'text-base text-green-600 font-okra-medium'}>₹{bus.price}</Text>
                    <Text className={'text-xs text-gray-400 font-okra line-through'}>₹{bus.originalPrice}</Text>
                </View>
                <Text className={'text-sm text-gray-600 font-okra'}>{bus.availableSeats} Seats</Text>
            </View>
        </TouchableOpacity>
    );
}

export default BusItem;
