import {useMemo} from 'react';
import {ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {IBus} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {searchBuses} from '@/service/requests/bus.ts';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {goBack, navigate} from '@/utils/NavigationUtils.ts';
import {screens} from '@/utils/constants.ts';

function BusListScreen() {
    const route = useRoute();
    const params = route.params as any;
    const {from, to, date} = params?.bus as Partial<IBus> & { date: Date };

    const formattedDate = useMemo(() => date.toISOString().split('T')[0], [date]);
    const {
        data: buses,
        isLoading,
        error,
    } = useQuery<IBus[]>({
        queryKey: ['buses', from, to, date],
        queryFn: async () => searchBuses(from!, to!, formattedDate!),
        enabled: !!from && !!to && !!date,
    });

    const renderItem = ({item: bus}: { item: IBus }) => {
        return (
            <TouchableOpacity onPress={() => navigate(screens.seatSelectionScreen, {busExternalId: bus.busExternalId})} className={'mb-4 p-4 rounded-lg shadow-sm bg-white'}>
                <Image source={require('../assets/images/sidebus.png')} className={'h-6 w-8'}/>
                <Text className={'text-lg text-gray-900 font-okra-bold'}>{bus.company}</Text>
                <Text className={'text-sm text-gray-500 font-okra-semibold'}>{bus.busType}</Text>

                <View className={'flex-row justify-between'}>
                    <Text className={'text-base text-gray-700 font-okra-semibold'}>
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
                        <Text className={'text-base text-green-600 font-okra-semibold'}>₹{bus.price}</Text>
                        <Text className={'text-xs text-gray-400 font-okra line-through'}>₹{bus.originalPrice}</Text>
                    </View>
                    <Text className={'text-sm text-gray-600 font-okra'}>{bus.availableSeats} Seats</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View className={'flex-1 bg-white'}>
            <SafeAreaView/>
            <View className={'flex-row items-center border-b-[1px] border-teal-800 bg-white p-4'}>
                <TouchableOpacity onPress={goBack}>
                    <ArrowLeftIcon size={24} color={'#000'}/>
                </TouchableOpacity>
                <View className={'ml-4'}>
                    <Text className={'text-lg font-okra-bold'}>{from} → {to}</Text>
                    <Text className={'text-sm text-gray-500 font-okra-semibold'}>{date?.toDateString()}</Text>
                </View>
            </View>

            {isLoading && (
                <View className={'flex-1 justify-center items-center'}>
                    <ActivityIndicator size={'large'} color={'teal'}/>
                    <Text className={'mt-2 text-gray-500 font-okra-bold'}>Loading buses...</Text>
                </View>
            )}

            {error && (
                <View className={'flex-1 justify-center items-center '}>
                    <Text className={'text-red-500 font-okra-bold'}>Failed to load buses</Text>
                </View>
            )}

            {!isLoading && !error && (
                <FlatList
                    data={buses}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.busExternalId}
                    contentContainerStyle={{padding: 16, flexGrow: 1}}
                    ListEmptyComponent={
                        <View className={'flex-1 justify-center items-center'}>
                            <Text className={'text-gray-500 font-okra font-bold'}>No buses found</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

export default BusListScreen;
