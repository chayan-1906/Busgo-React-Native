import {Alert, Image, View} from 'react-native';
import {useEffect} from 'react';
import {getAccessToken, getRefreshToken} from '@/service/storage';
import {resetAndNavigate} from '@/utils/NavigationUtils.ts';
import {screens} from '@/utils/constants.ts';
import {jwtDecode} from 'jwt-decode';
import {DecodedToken} from '@/types';
import {refreshTokens} from '@/service/requests/auth.ts';

function SplashScreen() {
    const tokenCheck = async () => {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken() as string;

        if (accessToken) {
            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

            const currentTime = Date.now() / 1000;
            if (decodedRefreshToken?.exp < currentTime) {
                await resetAndNavigate(screens.loginScreen);
                Alert.alert('Session expired, please login again');
                return;
            }

            if (decodedAccessToken?.exp < currentTime) {
                const refreshed = await refreshTokens();
                if (!refreshed) {
                    Alert.alert('There was an error');
                    return;
                }
            }

            await resetAndNavigate(screens.homeScreen);
            return;
        }
        await resetAndNavigate(screens.loginScreen);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            tokenCheck();
        }, 1500);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <View className={'flex-1 justify-center items-center bg-white'}>
            <Image source={require('../assets/images/logo_t.png')} resizeMode={'contain'} className={'h-[30%] w-[60%]'} />
        </View>
    );
}

export default SplashScreen;
