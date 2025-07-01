import {useEffect} from 'react';
import {Alert, Image, View} from 'react-native';
import {jwtDecode} from 'jwt-decode';
import {IDecodedToken} from '@/types';
import {screens} from '@/utils/constants.ts';
import {refreshTokens} from '@/service/requests/auth.ts';
import {resetAndNavigate} from '@/utils/NavigationUtils.ts';
import {getAccessToken, getRefreshToken} from '@/service/storage';
import LogoTImage from '../../assets/images/logo_t.png';

function SplashScreen() {
	const tokenCheck = async () => {
		const accessToken = getAccessToken();
		const refreshToken = getRefreshToken() as string;

		if (accessToken) {
			const decodedAccessToken = jwtDecode<IDecodedToken>(accessToken);
			const decodedRefreshToken = jwtDecode<IDecodedToken>(refreshToken);

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
			// await navigate(screens.busListScreen, {bus: {from: 'Chennai', to: 'Goa', date: new Date()} as Partial<IBus>});
			return;
		}
		await resetAndNavigate(screens.loginScreen);
	}

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			tokenCheck();
		}, 1500);

		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<View className={'flex-1 justify-center items-center bg-white'}>
			<Image source={LogoTImage} resizeMode={'contain'} className={'h-[30%] w-[60%]'}/>
		</View>
	);
}

export default SplashScreen;
