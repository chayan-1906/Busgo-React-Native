import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '@/utils/constants';
import {scheme} from "@/utils/deeplinks.ts";
import HomeScreen from '@/screens/HomeScreen';
import LoginScreen from '@/screens/LoginScreen';
import SplashScreen from '@/screens/SplashScreen';
import {navigationRef} from '@/utils/NavigationUtils';
import BusListScreen from '@/screens/BusListScreen.tsx';
import SeatSelectionScreen from '@/screens/SeatSelectionScreen.tsx';

// Create a type that represents the screen names
type ScreenNames = typeof screens;

// Define RootStackParamList using the keys from screens
export type RootStackParamList = {
    [K in keyof ScreenNames]: K extends 'seatSelectionScreen'
        ? { busExternalId: string }
        : K extends 'busListScreen'
            ? { from?: string, to?: string, date?: Date }
            : undefined;
};

const Stack = createNativeStackNavigator();

function Navigation() {
    const linking = {
        prefixes: [`${scheme}://`],
        config: {
            screens: {
                [screens.seatSelectionScreen]: {
                    path: 'bus/:busExternalId',
                    parse: {
                        busExternalId: (busExternalId: string) => busExternalId,
                    },
                },
            },
        },
    };

    return (
        <NavigationContainer ref={navigationRef} linking={linking}>
            <Stack.Navigator initialRouteName={screens.splashScreen} screenOptions={{headerShown: false}}>
                <Stack.Screen name={screens.splashScreen} component={SplashScreen}/>
                <Stack.Screen name={screens.loginScreen} component={LoginScreen}/>
                <Stack.Screen name={screens.homeScreen} component={HomeScreen}/>
                <Stack.Screen name={screens.busListScreen} component={BusListScreen}/>
                <Stack.Screen name={screens.seatSelectionScreen} component={SeatSelectionScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
