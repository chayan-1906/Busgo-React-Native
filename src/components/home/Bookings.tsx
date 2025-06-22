import {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {IPopulatedTicket} from '@/types';
import Search from '@/components/ui/Search.tsx';
import {useQuery} from '@tanstack/react-query';
import {getTicketsForUser} from '@/service/requests/bus.ts';
import {useFocusEffect} from '@react-navigation/native';
import BookItem from '@/components/home/BookItem.tsx';
import {tabs} from '@/utils/constants.ts';

function Bookings() {
    const [selectedTab, setSelectedTab] = useState<(typeof tabs)[number]>('All');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const {
        data: tickets,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['userTickets'],
        queryFn: getTicketsForUser,
        staleTime: 1000 * 60 * 5,
        refetchOnReconnect: true,
    });

    const onRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        setIsRefreshing(false);
    };

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch]),
    );

    const filteredBookings = selectedTab === 'All' ? tickets : tickets?.filter(ticket => ticket.status === selectedTab);

    if (isLoading) {
        return (
            <View className={'flex-1 items-center justify-center bg-white'}>
                <ActivityIndicator size={'large'} color={'teal'} />
                <Text className={'mt-2 text-gray-500 font-okra-bold'}>Loading bookings...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View className={'flex-1 items-center justify-center bg-white'}>
                <Text className={'text-red-500 font-okra-bold'}>Failed to load bookings</Text>
                <TouchableOpacity className={'mt-4 px-4 py-2 bg-teal-500 rounded'} onPress={onRefresh}>
                    <Text className={'text-white font-okra-bold'}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className={'flex-1 px-4 bg-white'}>
            <FlatList
                data={filteredBookings}
                renderItem={({item}: {item: IPopulatedTicket}) => <BookItem bookItem={item} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.ticketExternalId}
                nestedScrollEnabled={true}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
                ListHeaderComponent={
                    <>
                        <Search />
                        <Text className={'my-4 text-2xl font-okra-bold'}>Past Booking</Text>
                        <View className={'flex-row mb-4'}>
                            {tabs.map((tab: string) => {
                                return (
                                    <TouchableOpacity key={tab} className={`px-4 py-2 mx-1 rounded-lg ${selectedTab === tab ? 'bg-tertiary' : 'bg-gray-300'}`} onPress={() => setSelectedTab(tab)}>
                                        <Text className={`text-sm font-okra-medium ${selectedTab === tab ? 'text-white' : 'text-black'}`}>{tab}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </>
                }
                ListEmptyComponent={
                    <View className={'items-center mt-6'}>
                        <Text className={'text-gray-500 font-okra-bold'}>No bookings found</Text>
                    </View>
                }
            />
            <SafeAreaView />
        </View>
    );
}

export default Bookings;
