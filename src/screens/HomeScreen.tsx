import {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {UserCircleIcon} from 'react-native-heroicons/solid';
import {logout} from '@/service/requests/auth.ts';
import Bookings from '@/components/home/Bookings.tsx';

function HomeScreen() {
    const [testDate, setTestDate] = useState(new Date());

    return (
        <View className={'flex-1 bg-white'}>
            <SafeAreaView />

            <View className={'flex-row justify-between items-center px-4 py-2'}>
                <Text className={'font-okra font-semibold text-3xl'}>Bus Tickets</Text>
                <UserCircleIcon color={'red'} size={38} onPress={logout} />
            </View>

            {/*<View className={'h-80'}>
                <Text>Before DateTimePicker</Text>
                <DateTimePicker
                    value={testDate}
                    mode={'datetime'}
                    themeVariant={'light'}
                    display={'default'}
                    onChange={(event: DateTimePickerEvent, dateee: Date | undefined) => {
                        Alert.alert('Works!');
                        console.log('=== ONCHANGE FIRED ===');
                        console.log('dateee:', dateee);
                        dateee && setTestDate(new Date(dateee));
                    }}
                    style={{flex: 1}}
                />
                <Text>{testDate?.toDateString()}</Text>
                <Text>Timestamp: {testDate?.getTime()}</Text>
                <Text>After DateTimePicker</Text>
            </View>*/}

            <Bookings/>
        </View>
    );
}

export default HomeScreen;
