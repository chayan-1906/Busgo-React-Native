import {useState} from 'react';
import {ActivityIndicator, Alert, FlatList, Modal, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import LinearGradient from 'react-native-linear-gradient';
import {getAllCities} from '@/service/requests/city.ts';
import {LocationPickerModalProps} from '@/types/props.ts';

function LocationPickerModal({isVisible, onClose, onSelect, type, fromLocation}: LocationPickerModalProps) {
    const [search, setSearch] = useState<string>('');

    const {
        data: cities,
        isLoading,
        isError,
    } = useQuery<string[]>({
        queryKey: ['cities', search],
        queryFn: async () => getAllCities(search),
    });

    const handleLocationSelect = (location: string) => {
        if (type === 'to' && location === fromLocation) {
            Alert.alert('Invalid Destination', "Departure and Destination can't be the same");
            return; // source & destination can't be same
        }

        onSelect(location, type);
        onClose();
    };

    const renderItem = ({item: location}: {item: string}) => {
        /*return (
            <TouchableOpacity onPress={() => handleLocationSelect(location)} className={'p-3 border-b border-gray-300'}>
                <Text className={`text-base font-okra ${location === fromLocation ? 'text-gray-400' : 'text-black'}`}>{location}</Text>
            </TouchableOpacity>
        );*/

        return (
            <View className={'flex-1'}>
                <LinearGradient
                    colors={['#CF3239', '#FC5431']}
                    start={{x: 0.0, y: 0.0}}
                    end={{x: 1.0, y: 1.0}}
                    style={{
                        shadowOffset: {width: 0, height: 3},
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        elevation: 6,
                        borderRadius: 12,
                        padding: 2,
                        opacity: location === fromLocation ? 0.5 : 1,
                    }}
                >
                    <TouchableOpacity onPress={() => handleLocationSelect(location)} className={'p-3 border-b border-gray-300'}>
                        <Text className={`text-base font-okra-medium text-white`}>{location}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        );
    };

    return (
        <Modal transparent={false} visible={isVisible} animationType={'slide'}>
            <SafeAreaView className={`${Platform.OS === 'android' && 'mt-4'}`} />
            <View className={'flex-1 bg-white px-4'}>
                <Text className={'mb-4 text-lg font-okra-bold text-center'}>Select {type === 'from' ? 'Departure' : 'Destination'} City</Text>

                <TextInput value={search} placeholder={'Search city...'} autoFocus={true} onChangeText={setSearch} className={'p-3 border border-gray-400 rounded-md mb-4 font-okra'} />

                {isLoading ? (
                    <View className={'flex-1 justify-center items-center'}>
                        <ActivityIndicator size={'large'} color={'teal'} />
                        <Text className={'mt-2 text-gray-500 font-okra-bold'}>Loading cities...</Text>
                    </View>
                ) : isError ? (
                    <View className={'flex-1 justify-center items-center'}>
                        <Text className={'text-tertiary font-okra-bold'}>Failed to load cities</Text>
                    </View>
                ) : (
                    <FlatList data={cities} renderItem={renderItem} keyExtractor={item => item} keyboardShouldPersistTaps={'handled'} numColumns={2} contentContainerStyle={{columnGap: 6, rowGap: 6}} showsVerticalScrollIndicator={false} />
                )}

                <TouchableOpacity onPress={onClose} className={'p-3 mt-4 bg-gray-200 rounded-lg'}>
                    <Text className={'text-center text-black font-okra-medium'}>Cancel</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView className={`${Platform.OS === 'android' && 'mb-4'}`} />
        </Modal>
    );
}

export default LocationPickerModal;
