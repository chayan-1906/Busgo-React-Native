import {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useRoute} from '@react-navigation/native';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {AdjustmentsHorizontalIcon, ArrowLeftIcon} from 'react-native-heroicons/solid';
import {IBus, IFilterOption} from '@/types';
import Filter from '@/components/ui/Filter.tsx';
import {goBack} from '@/utils/NavigationUtils.ts';
import BusItem from '@/components/home/BusItem.tsx';
import {searchBuses} from '@/service/requests/bus.ts';
import {busTags, sortByOptions} from '@/utils/constants.ts';

function BusListScreen() {
    const route = useRoute();
    const params = route.params as any;
    const {from, to, date: dateString} = params?.bus as Partial<IBus> & { date: string };
    const date = new Date(dateString);
    const [selectedBusTags, setSelectedBusTags] = useState<IFilterOption[]>([]);
    const [selectedSortBy, setSelectedSortBy] = useState<IFilterOption>(sortByOptions[0]);
    const {showActionSheetWithOptions} = useActionSheet();

    const showSortOptions = () => {
        const options = sortByOptions.map(option => option.label);
        options.push('Cancel');

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: options.length - 1,
                title: 'Sort by',
            },
            (buttonIndex) => {
                if (buttonIndex !== undefined && buttonIndex < sortByOptions.length) {
                    setSelectedSortBy(sortByOptions[buttonIndex]);
                }
            }
        );
    };

    const formattedDate = useMemo(() => date.toISOString().split('T')[0], [date]);
    const {
        data: buses,
        isLoading,
        error,
        refetch,
    } = useQuery<IBus[]>({
        queryKey: ['buses', from, to, date],
        queryFn: async () => searchBuses(from!, to!, formattedDate!, selectedBusTags, selectedSortBy),
        enabled: !!from && !!to && !!date,
    });

    useEffect(() => {
        refetch();
    }, [refetch, selectedBusTags, selectedSortBy]);

    return (
        <View className={'flex-1 bg-white'}>
            {/** appbar */}
            <View className={'flex-row items-center justify-between border-b-[1px] border-teal-800 bg-white p-4'}>
                <View className={'flex-row items-center'}>
                    <TouchableOpacity onPress={goBack}>
                        <ArrowLeftIcon size={24} color={'#000'} />
                    </TouchableOpacity>
                    <View className={'ml-4'}>
                        <Text className={'text-lg font-okra-bold'}>
                            {from} → {to}
                        </Text>
                        <Text className={'text-sm text-gray-500 font-okra-medium'}>{date?.toDateString()}</Text>
                    </View>
                </View>

                {/** Sort */}
                <TouchableOpacity onPress={showSortOptions}>
                    <AdjustmentsHorizontalIcon size={24} color={'#000'} />
                </TouchableOpacity>
            </View>

            {/** loading state */}
            {isLoading && (
                <View className={'flex-1 justify-center items-center'}>
                    <ActivityIndicator size={'large'} color={'teal'} />
                    <Text className={'mt-2 text-gray-500 font-okra-bold'}>Loading buses...</Text>
                </View>
            )}

            {/** error */}
            {error && (
                <View className={'flex-1 justify-center items-center '}>
                    <Text className={'text-tertiary font-okra-bold'}>Failed to load buses</Text>
                </View>
            )}

            {/** bus list */}
            {!isLoading && !error && (
                <>
                    <Filter options={busTags} selectedOption={selectedBusTags} setSelectedOption={setSelectedBusTags} className={'px-4 pt-4'} multi={true} />
                    <FlatList
                        data={buses}
                        renderItem={BusItem}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.busExternalId}
                        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
                        contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, gap: 10}}
                        ListEmptyComponent={
                            <View className={'flex-1 justify-center items-center'}>
                                <Text className={'text-gray-500 font-okra-bold'}>No buses found</Text>
                            </View>
                        }
                    />
                </>
            )}
        </View>
    );
}

export default BusListScreen;
