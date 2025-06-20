import {useEffect, useState} from 'react';
import {Modal, Platform, Text, TouchableOpacity, View} from 'react-native';
import {DatePickerModalProps} from '@/types/props.ts';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';

function DatePickerModal({isVisible, onClose, onConfirm, selectedDate}: DatePickerModalProps) {
    const [tempDate, setTempDate] = useState(selectedDate);

    useEffect(() => {
        if (isVisible) {
            setTempDate(selectedDate);
        }
    }, [isVisible, selectedDate]);

    if (Platform.OS === 'android') {
        return (
            <DateTimePicker
                value={tempDate}
                mode={'date'}
                display={'default'}
                onChange={(event: DateTimePickerEvent, date: Date | undefined) => {
                    if (date) {
                        onConfirm(tempDate);
                        onClose();
                    }
                }}
            />
        );
    }

    return (
        <Modal transparent={true} visible={isVisible} animationType={'slide'}>
            <View className={'flex-1 justify-center'} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View className={'bg-white p-4 rounded-3xl mx-2'}>
                    {Platform.OS === 'ios' && (
                        <View className={'h-96'}>
                            <DateTimePicker value={tempDate} mode={'date'} display={'inline'} onChange={(event: DateTimePickerEvent, date: Date | undefined) => date && setTempDate(date)} style={{flex: 1}} />
                        </View>
                    )}
                    <Text>{tempDate?.toDateString()}</Text>
                    <View className={'flex-row justify-between mt-4'}>
                        <TouchableOpacity className={'flex-1 mx-2 p-3 bg-gray-300 rounded-lg'} onPress={onClose}>
                            <Text className={'text-center text-black font-bold'}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={'flex-1 mx-2 p-3 bg-blue-500 rounded-lg'}
                            onPress={() => {
                                onConfirm(tempDate);
                                onClose();
                            }}
                        >
                            <Text className={'text-center text-white font-bold'}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default DatePickerModal;
