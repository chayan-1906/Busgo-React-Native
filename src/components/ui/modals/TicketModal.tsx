import {Modal, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Circle, Line} from 'react-native-svg';
import {ShareIcon, XMarkIcon} from 'react-native-heroicons/solid';
import {TicketModalProps} from '@/types/props.ts';

function TicketModal({isVisible, onClose, bookingInfo}: TicketModalProps) {
    return (
        <Modal transparent={true} visible={isVisible} animationType={'slide'}>
            <View className={'flex-1 justify-center items-center'} style={{backgroundColor: 'rgba(42, 37, 38, 0.9)'}}>
                <TouchableOpacity onPress={onClose} className={'mb-5 p-1 bg-white shadow-sm rounded-full'}>
                    <XMarkIcon color={'black'} size={22} />
                </TouchableOpacity>

                {bookingInfo && bookingInfo.bus ? (
                    <View className={'bg-white overflow-hidden rounded-xl w-[90%] p-4 shadow-lg relative'}>
                        <Text className={'mb-2 text-center text-xl font-okra-bold'}>Your Ticket</Text>
                        <View className={'absolute left-[-14px] top-[61%] -translate-y-1/2'}>
                            <Svg height={40} width={28}>
                                <Circle cx={14} cy={20} r={14} fill={'#2A2526'} />
                            </Svg>
                        </View>
                        <View className={'absolute right-[-14px] top-[61%] -translate-y-1/2'}>
                            <Svg height={40} width={28}>
                                <Circle cx={14} cy={20} r={14} fill={'#2A2526'} />
                            </Svg>
                        </View>

                        <View className={'p-3 rounded-lg bg-gray-100'}>
                            <Text className={'text-gray-700 font-okra-medium'}>
                                {bookingInfo.bus.from} → {bookingInfo.bus.to}
                            </Text>
                            <Text className={'text-gray-500 text-sm font-okra'}>
                                {new Date(bookingInfo.bus.departureTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} -{' '}
                                {new Date(bookingInfo.bus.arrivalTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                                , {new Date(bookingInfo.date!).toDateString()}
                            </Text>
                        </View>

                        <View className={'mt-3'}>
                            <Text className={'text-gray-700 font-okra-medium'}>{bookingInfo.bus.company}</Text>
                            <Text className={'text-gray-500 text-sm font-okra'}>{bookingInfo.bus.busType}</Text>
                        </View>

                        <View className={'mt-3'}>
                            <Text className={'text-gray-700 font-okra-medium'}>Seat(s)</Text>
                            <Text className={'text-gray-500 text-sm font-okra'}>{bookingInfo.seatNumbers?.join(', ')}</Text>
                        </View>

                        <View className={'my-6 w-full'}>
                            <Svg height={2} width={'100%'}>
                                <Line x1={0} y1={0} x2={'100%'} y2={1} stroke={'gray'} strokeWidth={2} strokeDasharray={'6,6'} />
                            </Svg>
                        </View>

                        <View>
                            <Text className={'text-gray-700 font-okra-medium'}>Ticket #: {bookingInfo.ticketExternalId}</Text>
                            <Text className={'text-gray-700 font-okra-medium'}>PNR: {bookingInfo.pnr}</Text>
                            <Text className={'mt-2  text-lg font-okra-bold text-green-600'}>₹{bookingInfo.totalFare}</Text>
                        </View>

                        <TouchableOpacity className={'flex-row gap-2 py-3 px-4 rounded-lg mt-4 justify-center items-center bg-tertiary'}>
                            <ShareIcon color={'white'} size={16} />
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
