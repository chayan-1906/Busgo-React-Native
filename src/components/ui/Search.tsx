import {useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {navigate} from '@/utils/NavigationUtils.ts';
import {screens} from '@/utils/constants.ts';
import LinearGradient from 'react-native-linear-gradient';
import {CalendarDaysIcon, MagnifyingGlassIcon} from 'react-native-heroicons/solid';

function Search() {
    const [from, setFrom] = useState<string | null>(null);
    const [to, setTo] = useState<string | null>(null);
    const [date, setDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [locationType, setLocationType] = useState<'from' | 'to'>('from');
    const [showLocationPicker, setShowLocationPicker] = useState<boolean>(false);

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2); // booking for next 2 months

    const handleLocationSet = (location: string, type: 'from' | 'to') => {
        if (type === 'from') {
            setFrom(location);
            if (location === to) {
                setTo(null); // source and destination can't be same
            }
        } else {
            setTo(location);
        }
    };

    const handleSearchBuses = async () => {
        if (!from || !to) {
            Alert.alert('Missing Information', 'Please select both departure and destination locations');
            return;
        }
        if (!from === !to) {
            Alert.alert('Invalid Selection', "Departure and destination locations can't be the same");
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) {
            Alert.alert('Invalid Date', 'Please select a future date for your journey');
            return;
        }

        await navigate(screens.busListScreen, {bus: {from, to, date}});
    };

    return (
        <View className={'rounded-b-3xl overflow-hidden'}>
            <LinearGradient colors={['#78B0E6', '#FFF']} start={{x: 1, y: 1}} end={{x: 1, y: 0}}>
                <View className={'p-4'}>
                    <View className={'my-4 border z-20 bg-white rounded-md border-gray-600'}>
                        {/** from */}
                        <TouchableOpacity className={'flex-row p-4 gap-4 items-center'} onPress={() => (setLocationType('from'), setShowLocationPicker(true))}>
                            <Image source={require('../../assets/images/bus.png')} className={'size-6'} />
                            <Text className={'w-[90%] text-lg font-okra text-gray-600'}>{from || 'From'}</Text>
                        </TouchableOpacity>

                        {/** to */}
                        <TouchableOpacity className={'flex-row p-4 gap-4 items-center border-t-[1px] border-gray-400'} onPress={() => (setLocationType('to'), setShowLocationPicker(true))}>
                            <Image source={require('../../assets/images/bus.png')} className={'size-6'} />
                            <Text className={'w-[90%] text-lg font-okra text-gray-600'}>{to || 'To'}</Text>
                        </TouchableOpacity>

                        <View className={'flex-row items-center justify-between p-2'}>
                            <View className={'flex-row items-center'}>
                                <TouchableOpacity className={'p-2 mr-2 rounded-lg bg-secondary'} onPress={() => setDate(new Date())}>
                                    <Text className={'font-okra font-semibold text-sm'}>Today</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className={'p-2 mr-2 rounded-lg bg-secondary'}
                                    onPress={() => {
                                        const today = new Date();
                                        today.setDate(today.getDate() + 1);
                                        setDate(today);
                                    }}
                                >
                                    <Text className={'font-okra font-semibold text-sm'}>Tomorrow</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity className={'flex-row items-center'} onPress={() => setShowDatePicker(true)}>
                                <View className={'mr-3'}>
                                    <Text className={'text-sm font-okra font-normal text-gray-500'}>Date of Journey</Text>
                                    <Text className={'text-base font-okra font-bold text-gray-900'}>{date?.toDateString()}</Text>
                                </View>
                                <CalendarDaysIcon color={'#000'} size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity className={'flex-row items-center justify-center gap-2 my-2 p-3 bg-tertiary rounded-xl'} onPress={handleSearchBuses}>
                        <MagnifyingGlassIcon color={'#FFF'} size={22}/>
                        <Text className={'font-okra font-bold text-white text-lg'}>Search Buses</Text>
                    </TouchableOpacity>

                    <Image source={require('../../assets/images/sidebus.jpg')} className={'h-40 w-full my-4 rounded-lg'}/>
                </View>
            </LinearGradient>
        </View>
    );
}

export default Search;
