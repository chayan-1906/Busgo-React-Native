import {useEffect} from 'react';
import {Alert, Linking, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserCircleIcon} from 'react-native-heroicons/solid';
import {screens} from '@/utils/constants';
import {navigate} from '@/utils/NavigationUtils';
import {logout} from '@/service/requests/auth.ts';
import Bookings from '@/components/home/Bookings.tsx';

function HomeScreen() {
	const handleLogout = () => {
		Alert.alert('Logout', 'Are you sure you want to logout?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Logout',
				onPress: async () => await logout(),
			},
		]);
	};

	useEffect(() => {
		const handleUrl = async ({url}: { url: string }) => {
			console.log('Handling URL:', url);
			if (url?.includes('bus/')) {
				const busExternalId = url.split('bus/')[1];
				console.log('Deep link detected with busExternalId:', busExternalId);
				await navigate(screens.seatSelectionScreen, {busExternalId});
			}
		};

		// Check for initial URL when app opens from deep link
		Linking.getInitialURL().then(url => {
			console.log('Initial URL:', url);
			if (url) handleUrl({url});
		});

		// Listen for URL events while app is running
		const subscription = Linking.addEventListener('url', handleUrl);
		return () => subscription.remove();
	}, []);

	return (
		<SafeAreaView className={'flex-1 bg-white'}>
			<View className={'flex-row justify-between items-center px-4 py-2'}>
				<Text className={'text-3xl font-okra-bold'}>Welcome to BusGo</Text>
				<UserCircleIcon color={'red'} size={38} onPress={handleLogout}/>
			</View>
			<Bookings/>
		</SafeAreaView>
	);
}

export default HomeScreen;
