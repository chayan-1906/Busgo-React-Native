import {useRef} from "react";
import {Modal, Platform, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Circle, Line} from 'react-native-svg';
import {ShareIcon, XMarkIcon} from 'react-native-heroicons/solid';
import {TicketModalProps} from '@/types/props.ts';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';

function TicketModal({isVisible, onClose, bookingInfo}: TicketModalProps) {
    const viewShotRef = useRef<ViewShot>(null);

    const handleShareTicket = async () => {
        try {
            const uri = await viewShotRef.current?.capture?.();
            if (!uri) return;

            const shareOptions = {
                title: 'My Bus Ticket',
                url: Platform.OS === 'android' ? `file://${uri}` : uri,
                type: 'image/png',
                failOnCancel: false,
                message: 'Here is my ticket!',
            };

            await Share.open(shareOptions);
        } catch (error) {
            console.error('Error sharing ticket:', error);
        }
    }

    return (
        <Modal transparent={true} visible={isVisible && bookingInfo !== undefined && bookingInfo.bus !== undefined} animationType={'slide'}>
            <View className={'flex-1 justify-center items-center'} style={{backgroundColor: 'rgba(42, 37, 38, 0.9)'}}>
                <TouchableOpacity onPress={onClose} className={'mb-5 p-1 bg-white shadow-sm rounded-full'}>
                    <XMarkIcon color={'black'} size={22}/>
                </TouchableOpacity>

                {bookingInfo && bookingInfo.bus ? (
                    <View className={'bg-white overflow-hidden rounded-xl w-[90%] shadow-lg relative'}>
                        <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1, fileName: `ticket-${bookingInfo.pnr}`}} style={{backgroundColor: 'white', padding: 16}}>
                            <View className={''}>
                                <Text className={'text-center text-2xl font-okra-bold'}>Your Ticket</Text>

                                {/** Divider */}
                                <View className={'my-4 w-full'}>
                                    <Svg height={2} width={'100%'}>
                                        <Line x1={0} y1={0} x2={'100%'} y2={1} stroke={'gray'} strokeWidth={2} strokeDasharray={'6,6'}/>
                                    </Svg>
                                </View>

                                <View className={'p-3 rounded-lg bg-gray-200 border-l-4 border-tertiary'} style={{shadowOffset: {width: 2, height: 2}, shadowOpacity: 0.4, shadowRadius: 5, elevation: 6}}>
                                    <Text className={'text-lg font-okra-bold text-gray-900'}>
                                        {bookingInfo.bus?.from} → {bookingInfo.bus?.to}
                                    </Text>
                                    <Text className={'text-gray-800 text-sm font-okra'}>
                                        {new Date(bookingInfo.bus.departureTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} -{' '}
                                        {new Date(bookingInfo.bus.arrivalTime).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                        , {new Date(bookingInfo.date!).toDateString()}
                                    </Text>
                                </View>

                                <View className={'flex-row mt-6 gap-4'}>
                                    {/** about bus */}
                                    <View className={'p-3 rounded-lg bg-gray-200 border-l-4 border-tertiary flex-1'} style={{shadowOffset: {width: 2, height: 2}, shadowOpacity: 0.4, shadowRadius: 5, elevation: 6}}>
                                        <Text className={'text-gray-700 font-okra-medium'}>{bookingInfo.bus.company}</Text>
                                        <Text className={'text-gray-500 text-sm font-okra'}>{bookingInfo.bus.busTags.join(', ')}</Text>
                                    </View>

                                    {/** Seat Numbers */}
                                    <View className={'p-3 rounded-lg bg-gray-200 border-l-4 border-tertiary flex-1'} style={{shadowOffset: {width: 2, height: 2}, shadowOpacity: 0.4, shadowRadius: 5, elevation: 6}}>
                                        <Text className={'text-gray-700 font-okra-medium'}>Seat(s)</Text>
                                        <Text className={'text-gray-500 text-sm font-okra'}>{bookingInfo.seatNumbers?.join(', ')}</Text>
                                    </View>
                                </View>

                                {/** Divider */}
                                <View className={'mt-7 w-full'}>
                                    <Svg height={2} width={'100%'}>
                                        <Line x1={0} y1={0} x2={'100%'} y2={1} stroke={'gray'} strokeWidth={2} strokeDasharray={'6,6'}/>
                                    </Svg>
                                </View>

                                <View>
                                    <Text className={'mt-4 mb-2 uppercase text-xl text-gray-800 font-okra-bold'}>Ticket Details</Text>
                                    <Text className={'text-gray-700 font-okra-medium'}>Ticket #: {bookingInfo.ticketExternalId}</Text>
                                    <Text className={'text-gray-700 font-okra-medium'}>PNR: {bookingInfo.pnr}</Text>
                                    <View className={'flex-row justify-between items-center my-3'}>
                                        <Text className={'text-lg font-okra-bold text-green-600'}>Total Amount</Text>
                                        <Text className={'bg-emerald-100 rounded-full px-3 py-1 text-lg font-okra-bold text-emerald-600'}>₹{bookingInfo.totalFare}</Text>
                                    </View>
                                </View>
                            </View>

                            {/** curves - svgs */}
                            <View className={'absolute left-[-14px] top-[69%] -translate-y-1/2'}>
                                <Svg height={40} width={28}>
                                    <Circle cx={14} cy={20} r={14} fill={'#2A2526'}/>
                                </Svg>
                            </View>
                            <View className={'absolute right-[-14px] top-[69%] -translate-y-1/2'}>
                                <Svg height={40} width={28}>
                                    <Circle cx={14} cy={20} r={14} fill={'#2A2526'}/>
                                </Svg>
                            </View>
                        </ViewShot>
                        <TouchableOpacity className={'flex-row gap-2 py-3 px-4 mx-4 mb-4 rounded-lg justify-center items-center bg-tertiary'} onPress={handleShareTicket}>
                            <ShareIcon color={'white'} size={16}/>
                            <Text className={'text-white font-okra-medium'}>Share your ticket</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View className={'relative bg-white overflow-hidden rounded-xl w-[90%] p-4 shadow-lg'}>
                        <Text className={'text-tertiary text-center font-okra-bold'}>Failed to load ticket</Text>
                        <TouchableOpacity className={'mt-4 px-4 py-2 self-center bg-teal-500 rounded'} onPress={onClose}>
                            <Text className={'text-white font-okra-medium'}>Close</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </Modal>
    );
}

export default TicketModal;
