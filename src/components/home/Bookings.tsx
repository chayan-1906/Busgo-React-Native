import {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {IFilterOption, IPopulatedTicket} from '@/types';
import Search from '@/components/ui/Search.tsx';
import {useQuery} from '@tanstack/react-query';
import {getTicketsForUser} from '@/service/requests/bus.ts';
import {useFocusEffect} from '@react-navigation/native';
import BookItem from '@/components/home/BookItem.tsx';
import {tabs} from '@/utils/constants.ts';
import Filter from '@/components/ui/Filter.tsx';

function Bookings() {
    const [selectedTab, setSelectedTab] = useState<IFilterOption>(tabs[0]);
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

    const filteredBookings = selectedTab.value === 'All' ? tickets : tickets?.filter(ticket => ticket.status === selectedTab.value);

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
                <Text className={'text-tertiary font-okra-bold'}>Failed to load bookings</Text>
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
                        <Text className={'my-4 text-2xl font-okra-bold'}>All Bookings</Text>
                        <Filter options={tabs} selectedOption={selectedTab} setSelectedOption={setSelectedTab} />
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
