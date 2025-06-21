import {Dimensions} from 'react-native';

export enum Colors {
    primary = '#FC5431',
}

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

export const screens = {
    splashScreen: 'SplashScreen',
    loginScreen: 'LoginScreen',
    homeScreen: 'HomeScreen',
    busListScreen: 'BusListScreen',
    seatSelectionScreen: 'SeatSelectionScreen',
}

export const storage = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
}
