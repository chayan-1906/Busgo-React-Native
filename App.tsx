import './global.css';
import Navigation from '@/navigation/Navigation';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/service/queryClient';
import {useEffect} from 'react';
import {Linking, LogBox} from 'react-native';

// Ignore warnings in development
LogBox.ignoreLogs(['Require cycle', 'Warning']);

function App() {
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

    return (
        <QueryClientProvider client={queryClient}>
            <Navigation />
        </QueryClientProvider>
    );
}

export default App;
