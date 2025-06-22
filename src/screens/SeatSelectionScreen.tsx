import {useCallback, useState} from 'react';
import {ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {IBus, ITicket} from '@/types';
import {useMutation, useQuery} from '@tanstack/react-query';
import {bookTicket, getBusDetails} from '@/service/requests/bus.ts';
import {goBack, resetAndNavigate} from '@/utils/NavigationUtils.ts';
import {ArrowLeftIcon, StarIcon} from 'react-native-heroicons/solid';
import TicketModal from '@/components/ui/modals/TicketModal.tsx';
import {screens} from '@/utils/constants.ts';
import PaymentButton from '@/components/ui/PaymentButton.tsx';
import Seat from '@/components/ui/Seat.tsx';

function SeatSelectionScreen() {
    const route = useRoute();
    const params = route.params as any;
    const {busExternalId} = params as Partial<IBus>;

    const [isTicketVisible, setIsTicketVisible] = useState<boolean>(false);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    const {
        data: busInfo,
        isLoading,
        isError,
        refetch,
    } = useQuery<IBus>({
        queryKey: ['busDetails', busExternalId],
        queryFn: async () => getBusDetails(busExternalId!),
        enabled: !!busExternalId,
    });

    const bookTicketMutation = useMutation({
        mutationFn: async ({date, seatNumbers}: Partial<ITicket>) => await bookTicket(busExternalId!, date!, seatNumbers!),
        onSuccess: (ticket: ITicket) => {
            console.log('Ticket booked successfully 🎉', ticket);
            setIsTicketVisible(true);
        },
        onError: (error: any) => {
            console.log('Error booking ticket ❌', error);
            Alert.alert('Failed', 'Failed to book ticket, please try again later');
        },
    });

    const handleSeatSelection = (seatId: number) => {
        setSelectedSeats((prevSelections: number[]) => (prevSelections.includes(seatId) ? prevSelections.filter((selectedSeatId: number) => selectedSeatId !== seatId) : [...prevSelections, seatId]));
    };

    const handleOnPay = () => {
        if (!busInfo) {
            Alert.alert('Failed', 'Failed to load bus details');
            return;
        }
        if (selectedSeats.length === 0) {
            Alert.alert('Invalid Selection', 'Please select at least one seat');
            return;
        }
        bookTicketMutation.mutate({date: new Date(busInfo.departureTime).toISOString(), seatNumbers: selectedSeats});
    };

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch]),
    );

    if (isLoading) {
        return (
            <View className={'flex-1 items-center justify-center bg-white'}>
                <ActivityIndicator size={'large'} color={'teal'} />
                <Text className={'text-gray-500 mt-2'}>Loading bus details...</Text>
            </View>
        );
    }

    if (isError || !busInfo) {
        return (
            <View className={'flex-1 items-center justify-center bg-white'}>
                <Text className={'text-red-500 font-okra font-bold'}>Failed to load bus details</Text>
                <TouchableOpacity className={'mt-4 px-4 py-2 bg-teal-500 rounded'} onPress={goBack}>
                    <Text className={'text-white font-semibold'}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className={'flex-1 bg-white'}>
            <SafeAreaView />
            <View className={'flex-row items-center border-b-[1px] border-teal-800 bg-white p-4'}>
                <TouchableOpacity onPress={goBack}>
                    <ArrowLeftIcon size={24} color={'#000'} />
                </TouchableOpacity>
                <View className={'ml-4'}>
                    <Text className={'text-lg font-okra font-bold'}>
                        {busInfo.from} → {busInfo.to}
                    </Text>
                    <Text className={'text-sm text-gray-500'}>
                        {new Date(busInfo.departureTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} {new Date(busInfo.departureTime).toDateString()}
                    </Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 200}} className={'p-4 pb-20  bg-teal-100'}>
                <Seat selectedSeats={selectedSeats} seats={busInfo.seats} onSeatSelect={handleSeatSelection} />

                <View className={'p-4 bg-white rounded-lg drop-shadow-md'}>
                    <View className={'flex-row justify-between items-center mb-2'}>
                        <Text className={'text-lg font-okra font-semibold'}>{busInfo.company}</Text>
                        <View className={'flex-row items-center'}>
                            <StarIcon size={18} color={'gold'} />
                            <Text className={'ml-1 text-gray-600 text-sm'}>
                                {busInfo.rating} ({busInfo.totalReviews})
                            </Text>
                        </View>
                    </View>

                    <Text className={'mb-1 text-sm text-gray-600'}>{busInfo.busType}</Text>

                    <View className={'flex-row justify-between items-center mt-2'}>
                        <View className={'items-start'}>
                            <Text className={'text-lg font-okra font-black'}>{new Date(busInfo.departureTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Text>
                            <Text className={'text-sm text-gray-500'}>Departure</Text>
                        </View>
                        <Text className={'text-sm text-gray-500'}>{busInfo.duration}</Text>
                        <View className={'items-end'}>
                            <Text className={'text-lg font-okra font-black'}>{new Date(busInfo.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Text>
                            <Text className={'text-sm text-gray-500'}>Arrival</Text>
                        </View>
                    </View>

                    <Text className={'mt-3 text-sm text-green-600'}>{busInfo.availableSeats} Seats</Text>

                    <View className={'flex-row items-center mt-2 gap-2'}>
                        <Text className={'text-gray-400 line-through font-okra text-lg'}>₹{busInfo.originalPrice}</Text>
                        <Text className={'text-black font-okra font-bold text-xl'}>₹{busInfo.price}</Text>
                    </View>

                    <View className={'flex-row gap-2 mt-3'}>
                        {busInfo.badges.map((badge: string, index: number) => {
                            return (
                                <View key={index} className={'bg-yellow-200 px-3 py-1 rounded-full'}>
                                    <Text className={'text-yellow-700 font-okra font-semibold'}>{badge}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

            <PaymentButton noOfSeats={selectedSeats.length} price={busInfo.price} onPay={handleOnPay} />

            {/*{isTicketVisible && <TicketModal isVisible={isTicketVisible} onClose={() => setIsTicketVisible(false)} bookingInfo={{bus: busInfo}} />}*/}
            <TicketModal
                isVisible={isTicketVisible}
                onClose={async () => (await resetAndNavigate(screens.homeScreen), setIsTicketVisible(false))}
                bookingInfo={{
                    bus: busInfo,
                    date: bookTicketMutation.data?.date,
                    seatNumbers: bookTicketMutation.data?.seatNumbers,
                    ticketExternalId: bookTicketMutation.data?.ticketExternalId,
                    pnr: bookTicketMutation.data?.pnr,
                    totalFare: bookTicketMutation.data?.totalFare,
                }}
            />
        </View>
    );
}

export default SeatSelectionScreen;
