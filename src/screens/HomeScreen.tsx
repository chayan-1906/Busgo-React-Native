import {SafeAreaView, Text, View} from 'react-native';
import {UserCircleIcon} from 'react-native-heroicons/solid';
import {logout} from '@/service/requests/auth.ts';
import Bookings from '@/components/home/Bookings.tsx';

function HomeScreen() {
    return (
        <View className={'flex-1 bg-white'}>
            <SafeAreaView />

            <View className={'flex-row justify-between items-center px-4 py-2'}>
                <Text className={'text-3xl font-okra-bold'}>Welcome to BusGo</Text>
                <UserCircleIcon color={'red'} size={38} onPress={logout} />
            </View>
            <Bookings />
        </View>
    );
}

export default HomeScreen;
