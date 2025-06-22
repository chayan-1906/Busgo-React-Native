import {useState} from 'react';
import {Modal, Platform, Text, TouchableOpacity, View} from 'react-native';
import {DatePickerModalProps} from '@/types/props.ts';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';

function DatePickerModal({isVisible, onClose, onConfirm, selectedDate}: DatePickerModalProps) {
    const [tempDate, setTempDate] = useState(selectedDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const twoMonthsAfter = new Date(today);
    twoMonthsAfter.setMonth(twoMonthsAfter.getMonth() + 2);

    const onChangeAndroid = (event: DateTimePickerEvent, date: Date | undefined) => {
        if (event.type === 'set' && date) {
            setTempDate(date);
            onConfirm(date);
            onClose();
        }
    };

    if (Platform.OS === 'android') {
        return <DateTimePicker value={tempDate} mode={'date'} display={'compact'} minimumDate={tomorrow} maximumDate={twoMonthsAfter} onChange={onChangeAndroid} />;
    }

    return (
        <Modal transparent={true} visible={isVisible} animationType={'slide'}>
            <View className={'flex-1 justify-center'} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View className={'bg-white p-4 rounded-3xl mx-2 items-center'}>
                    {Platform.OS === 'ios' && <DateTimePicker value={tempDate} mode={'date'} display={'spinner'} minimumDate={tomorrow} maximumDate={twoMonthsAfter} onChange={(event: DateTimePickerEvent, date: Date | undefined) => event.type === 'set' && date && setTempDate(date)} />}
                    <View className={'flex-row justify-between mt-4'}>
                        <TouchableOpacity className={'flex-1 mx-2 p-3 bg-gray-300 rounded-lg'} onPress={onClose}>
                            <Text className={'text-center text-black font-okra-medium'}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={'flex-1 mx-2 p-3 bg-tertiary rounded-lg'} onPress={() => (onConfirm(tempDate), onClose())}>
                            <Text className={'text-center text-white font-okra-medium'}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default DatePickerModal;
