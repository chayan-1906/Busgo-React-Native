import {Modal, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Circle, Line} from 'react-native-svg';
import {ArrowDownOnSquareIcon, XMarkIcon} from 'react-native-heroicons/solid';
import {TicketModalProps} from '@/types/props.ts';

function TicketModal({isVisible, onClose, bookingInfo}: TicketModalProps) {
    return (
        <Modal transparent={true} visible={isVisible} animationType={'slide'}>
            <View className={'flex-1 justify-center items-center bg-[#2A2526]'}>
                <TouchableOpacity className={'mb-5 p-1 bg-white shadow-sm rounded-full'}>
                    <XMarkIcon color={'black'} size={22} />
                </TouchableOpacity>

                <View className={'bg-white overflow-hidden rounded-xl w-[90%] p-4 shadow-lg relative'}>
                    <Text className={'mb-2 text-center text-lg font-okra font-semibold'}>Your Ticket</Text>
                    <View className={'absolute left-[-14px] top-[60^] -translate-y-1/2'}>
                        <Svg height={40} width={28}>
                            <Circle cx={14} cy={20} r={14} fill={'#2A2526'} />
                        </Svg>
                    </View>
                    <View className={'absolute left-[-14px] top-[60^] -translate-y-1/2'}>
                        <Svg height={40} width={28}>
                            <Circle cx={14} cy={20} r={14} fill={'#2A2526'} />
                        </Svg>
                    </View>

                    <View className={'p-3 rounded-lg bg-gray-100'}>
                        <Text className={'text-gray-700 font-okra font-semibold'}>
                            {bookingInfo.bus.from} → {bookingInfo.bus.to}
                        </Text>
                        <Text className={'text-gray-500 text-sm font-okra'}>
                            {bookingInfo.bus.departureTime} - {bookingInfo.bus.arrivalTime}, {bookingInfo.date}
                        </Text>
                    </View>

                    <View className={'mt-3'}>
                        <Text className={'text-gray-700 font-okra'}>{bookingInfo.bus.company}</Text>
                        <Text className={'text-gray-500 text-sm font-okra'}>{bookingInfo.bus.busType}</Text>
                    </View>

                    <View className={'mt-3'}>
                        <Text className={'text-gray-700 font-okra'}>Seats</Text>
                        <Text className={'text-gray-500 text-sm font-okra'}>{bookingInfo.seatNumbers}</Text>
                    </View>

                    <View className={'my-6 w-full'}>
                        <Svg height={2} width={'100%'}>
                            <Line x1={0} y1={0} x2={'100%'} y2={1} stroke={'gray'} strokeWidth={2} strokeDasharray={'6,6'} />
                        </Svg>
                    </View>

                    <View className={'mt-3'}>
                        <Text className={'text-gray-700'}>Ticket #: {bookingInfo.ticketExternalId}</Text>
                        <Text className={'text-gray-700'}>PNR: {bookingInfo.pnr}</Text>
                        <Text className={'mt-2  text-lg font-okra font-bold text-green-600'}>₹{bookingInfo.totalFare}</Text>
                    </View>

                    <TouchableOpacity className={'flex-row gap-2 p-3 rounded-lg mt-4 justify-center items-center bg-red-500'}>
                        <ArrowDownOnSquareIcon color={'white'} />
                        <Text className={'text-white font-okra font-semibold'}>Share your ticket</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default TicketModal;
