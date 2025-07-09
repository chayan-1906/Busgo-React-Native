import {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, Platform, RefreshControl, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
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
	const {from, to, date} = params?.bus as Partial<IBus> & { date: Date };
	const [selectedBusTags, setSelectedBusTags] = useState<IFilterOption[]>([]);
	const [selectedSortBy, setSelectedSortBy] = useState<IFilterOption>(sortByOptions[0]);
	const {showActionSheetWithOptions} = useActionSheet();

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

	const handleSelect = useCallback((buttonIndex?: number) => {
		if (buttonIndex === undefined) return;
		const cancelIndex = sortByOptions.length;
		if (buttonIndex < cancelIndex) {
			setSelectedSortBy(sortByOptions[buttonIndex]);
		}
	}, []);

	const showActionSheet = useCallback(() => {
		const displayOptions = sortByOptions.map(option =>
			option.value === selectedSortBy.value ? `✓ ${option.label}` : option.label
		);
		const options = [...displayOptions, 'Cancel'];
		const cancelButtonIndex = sortByOptions.length;

		showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
				tintColor: '#CF3239',
				showSeparators: true,
				textStyle: {
					textAlign: 'center',
					fontSize: 16,
				},
				containerStyle: {paddingBottom: Platform.OS === 'android' ? 30 : 0},
			},
			handleSelect);
	}, [showActionSheetWithOptions, handleSelect, selectedSortBy.value]);

	useEffect(() => {
		refetch();
	}, [refetch, selectedBusTags, selectedSortBy]);

	return (
		<View className={'flex-1 bg-white'}>
			<SafeAreaView/>

			{/** appbar */}
			<View className={'flex-row items-center justify-between border-b-[1px] border-teal-800 bg-white p-4'}>
				<View className={'flex-row items-center'}>
					<TouchableOpacity onPress={goBack}>
						<ArrowLeftIcon size={24} color={'#000'}/>
					</TouchableOpacity>
					<View className={'ml-4'}>
						<Text className={'text-lg font-okra-bold'}>
							{from} → {to}
						</Text>
						<Text className={'text-sm text-gray-500 font-okra-medium'}>{date?.toDateString()}</Text>
					</View>
				</View>

				{/** Sort */}
				<TouchableOpacity onPress={showActionSheet}>
					<AdjustmentsHorizontalIcon size={24} color={'#000'}/>
				</TouchableOpacity>
			</View>

			{/** loading state */}
			{isLoading && (
				<View className={'flex-1 justify-center items-center'}>
					<ActivityIndicator size={'large'} color={'teal'}/>
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
					<Filter options={busTags} selectedOption={selectedBusTags} setSelectedOption={setSelectedBusTags} className={'px-4 pt-4'} multi={true}/>
					<FlatList
						data={buses}
						renderItem={({item}) => <BusItem item={item}/>}
						showsVerticalScrollIndicator={false}
						keyExtractor={item => item.busExternalId}
						refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch}/>}
						contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, gap: 10}}
						ListEmptyComponent={
							<View className={'flex-1 justify-center items-center'}>
								<Text className={'text-gray-500 font-okra-bold'}>No buses found</Text>
							</View>
						}
					/>
					<SafeAreaView className={`${Platform.OS === 'android' && 'mb-4'}`}/>
				</>
			)}
		</View>
	);
}

export default BusListScreen;
