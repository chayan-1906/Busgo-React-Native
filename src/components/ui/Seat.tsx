import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import CustomView from '@/components/ui/CustomView';
import {ISeat} from '@/types';
import {SeatProps} from '@/types/props.ts';
import BookedIcon from '../../../assets/images/booked.jpg';
import SelectedIcon from '../../../assets/images/selected.jpg';
import AvailableIcon from '../../../assets/images/available.jpg';
import WheelImage from '../../../assets/images/wheel.png';

function Seat({seats, onSeatSelect, selectedSeats}: SeatProps) {
    return (
        <View className={'flex-row justify-between mb-4'}>
            <View className={'w-[30%] items-center justify-around p-4 bg-white rounded-2xl'}>
                <Text className={'mb-4 text-lg font-okra-bold'}>Seat Type</Text>
                <View className={'items-center mb-4'}>
                    <Image source={SelectedIcon} className={'size-12'}/>
                    <Text className={'mb-4 text-base font-okra font-medium'}>Selected</Text>
                </View>

                <View className={'items-center mb-4'}>
                    <Image source={AvailableIcon} className={'size-12'}/>
                    <Text className={'mb-4 text-base font-okra-medium'}>Available</Text>
                </View>

                <View className={'items-center mb-4'}>
                    <Image source={BookedIcon} className={'size-12'}/>
                    <Text className={'mb-4 text-base font-okra-medium'}>Booked</Text>
                </View>
            </View>

            <View className={'w-[65%] bg-white p-4 rounded-2xl'}>
                <Image source={WheelImage} className={'mb-4 self-end size-10'}/>
                <View className={'mt-2 w-full'}>
                    {seats.map((row: ISeat[], index: number) => (
                        <CustomView key={`row-${index}`} className={'flex-row w-full justify-between items-center'}>
                            <View className={'flex-row w-full justify-between items-center'}>
                                {row.map((seat: ISeat) => {
                                    if (seat.seatType === 'path') {
                                        return <CustomView key={`seat-${seat.seatId}`} className={'p-5 m-1'}/>;
                                    }

                                    return (
                                        <TouchableOpacity key={`seat-${seat.seatId}`} disabled={seat.isBooked} onPress={() => onSeatSelect(seat.seatId)}>
                                            <Image source={selectedSeats.includes(seat.seatId) ? SelectedIcon : seat.isBooked ? BookedIcon : AvailableIcon} className={'my-1 size-12'}/>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </CustomView>
                    ))}
                </View>
            </View>
        </View>
    );
}

export default Seat;
