import {Image, Text, View} from 'react-native';
import {useEffect} from 'react';
import {getAccessToken, getRefreshToken} from '@/service/storage';

function SplashScreen() {
    const tokenCheck = async () => {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken() as string;
        const hello = '' as string;
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            tokenCheck();
        }, 1500);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <View className={'flex-1 justify-center items-center bg-white'}>
            <Image source={require('../assets/images/logo_t.png')} resizeMode={'contain'} className={'h-[30%] w-[60%]'}/>
            <Text className={'font-excali'}>Excali-Regular</Text>
            <Text style={{fontFamily: 'M-Black'}}>M-Black</Text>
            <Text style={{fontFamily: 'M-SemiBold'}}>M-SemiBold</Text>
        </View>
    );
}

export default SplashScreen;
