import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '@/utils/constants';
import LoginScreen from '@/screens/LoginScreen';
import SplashScreen from '@/screens/SplashScreen';
import {navigationRef} from '@/utils/NavigationUtils';
import HomeScreen from '@/screens/HomeScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={screens.splashScreen} screenOptions={{headerShown: false}}>
                <Stack.Screen name={screens.splashScreen} component={SplashScreen} />
                <Stack.Screen name={screens.loginScreen} component={LoginScreen} />
                <Stack.Screen name={screens.homeScreen} component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
