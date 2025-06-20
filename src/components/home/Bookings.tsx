import {ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {tabs} from '@/utils/dummyData.ts';
import Search from '@/components/ui/Search.tsx';
import {useQuery} from '@tanstack/react-query';
import {getTicketsForUser} from '@/service/requests/bus.ts';
import {useFocusEffect} from '@react-navigation/native';
import BookItem from '@/components/home/BookItem.tsx';
import {ITicket} from '@/types';

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

    const filteredBookings = selectedTab === 'All' ? tickets : tickets?.filter((ticket: ITicket) => ticket.status === selectedTab);

    useEffect(() => {
        console.log('booking fetched');
    }, []);

    if (isLoading) {
        return (
            <View className={'flex-1 items-center justify-center bg-white'}>
                <ActivityIndicator size={'large'} color={'teal'} />
                <Text className={'text-gray-500 mt-2'}>Fetching bookings...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View className={'flex-1 items-center justify-center bg-white'}>
                <Text>Failed to fetch bookings.</Text>
                <TouchableOpacity className={'mt-4 px-4 py-2 bg-blue-500 rounded'}>
                    <Text className={'text-white font-semibold'}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className={'flex-1 p-2 bg-white'}>
            <FlatList
                data={filteredBookings}
                renderItem={({item}) => <BookItem bookItem={item} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.ticketExternalId}
                nestedScrollEnabled={true}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
                ListHeaderComponent={
                    <>
                        <Search />
                        <Text className={'text-2xl font-okra font-bold my-4'}>Past Booking</Text>
                        <View className={'flex-row mb-4'}>
                            {tabs.map((tab: string) => {
                                return (
                                    <TouchableOpacity key={tab} className={`px-4 py-2 mx-1 rounded-lg ${selectedTab === tab ? 'bg-red-500' : 'bg-gray-300'}`} onPress={() => setSelectedTab(tab)}>
                                        <Text className={`text-sm font-bold ${selectedTab === tab ? 'text-white' : 'text-black'}`}>{tab}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </>
                }
                ListEmptyComponent={
                    <View className={'items-center mt-6'}>
                        <Text className={'text-gray-500'}>No bookings found</Text>
                    </View>
                }
            />
        </View>
    );
}

export default Bookings;
