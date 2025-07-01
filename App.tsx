import {useEffect} from 'react';
import {Linking} from 'react-native';
import {useFonts} from "expo-font";
import * as ExpoSplashScreen from 'expo-splash-screen';
import './global.css';
import queryClient from '@/service/queryClient';
import Navigation from '@/navigation/Navigation';
import {QueryClientProvider} from '@tanstack/react-query';

function App() {
	console.log('App loaded');

	const [fontsLoaded] = useFonts({
		'Okra-Regular': require('./assets/fonts/Okra-Regular.ttf'),
		'Okra-Medium': require('./assets/fonts/Okra-Medium.ttf'),
		'Okra-MediumLight': require('./assets/fonts/Okra-MediumLight.ttf'),
		'Okra-Bold': require('./assets/fonts/Okra-Bold.ttf'),
		'Okra-ExtraBold': require('./assets/fonts/Okra-ExtraBold.ttf'),
	});

	useEffect(() => {
		if (fontsLoaded) {
			ExpoSplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	useEffect(() => {
		// Add debug log for all deep links
		const handleDeepLink = event => {
			console.log('Deep link received in App.tsx:', event);
		};

		// Get initial URL if app was opened from deep link
		Linking.getInitialURL().then(url => {
			console.log('App.tsx - Initial URL:', url);
		});

		// Listen for deep links while app is running
		const linkingSubscription = Linking.addEventListener('url', handleDeepLink);
		return () => linkingSubscription.remove();
	}, []);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<Navigation/>
		</QueryClientProvider>
	);
}

export default App;