import {useState} from 'react';
import {Alert, FlatList, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {locations} from '@/utils/dummyData.ts';
import {LocationPickerModalProps} from '@/types/props.ts';

function LocationPickerModal({isVisible, onClose, onSelect, type, fromLocation}: LocationPickerModalProps) {
    const [search, setSearch] = useState<string>('');
    const filteredLocations = locations.filter(location => location.toLowerCase().includes(search.toLowerCase()));

    const handleLocationSelect = (location: string) => {
        if (type === 'to' && location === fromLocation) {
            Alert.alert('Invalid Destination', "Departure and Destination can't be the same");
            return; // source & destination can't be same
        }

        onSelect(location, type);
        onClose();
    };

    const renderItem = ({item: location}: {item: string}) => {
        return (
            <TouchableOpacity onPress={() => handleLocationSelect(location)} className={'p-3 border-b border-gray-300'}>
                <Text className={`text-base font-okra ${location === fromLocation ? 'text-gray-400' : 'text-black'}`}>{location}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal transparent={false} visible={isVisible} animationType={'slide'}>
            <SafeAreaView />
            <View className={'flex-1 bg-white px-4'}>
                <Text className={'mb-4 text-lg font-okra font-bold text-center'}>Select {type === 'from' ? 'Departure' : 'Destination'} city</Text>
                <TextInput value={search} placeholder={'Search city...'} onChangeText={setSearch} className={'p-3 border border-gray-400 rounded-md mb-4 font-okra'} />
                <FlatList data={filteredLocations} renderItem={renderItem} keyExtractor={item => item} />
                <TouchableOpacity onPress={onClose} className={'p-3 mt-4 bg-gray-300 rounded-lg'}>
                    <Text className={'text-center text-black font-okra font-semibold'}>Cancel</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView />
        </Modal>
    );
}

export default LocationPickerModal;
