import axios from 'axios';
import {apis} from '@/utils/apis.ts';
import apiClient from '../apiClient.ts';
import {screens} from '@/utils/constants.ts';
import {resetAndNavigate} from '@/utils/NavigationUtils.ts';
import {getRefreshToken, removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken} from '../storage.ts';

export const loginWithGoogle = async (idToken: string) => {
    console.log('Google login attempt with token:', idToken?.substring(0, 20) + '...');
    try {
        const {data} = await apiClient.post(apis.loginApi, {idToken});
        console.log('Login response:', data);
        setAccessToken(data?.accessToken);
        setRefreshToken(data?.refreshToken);
        return data?.user;
    } catch (error: any) {
        console.error('Login API error:', error.response?.data || error.message);
        throw error;
    }
};

export const logout = async () => {
    removeAccessToken();
    removeRefreshToken();
    await resetAndNavigate(screens.loginScreen);
};

export const refreshTokens = async (): Promise<boolean> => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        const {data} = await axios.post(apis.refreshTokenApi, refreshToken);
        if (data?.accessToken) {
            setAccessToken(data?.accessToken);
            return true;
        } else {
            throw new Error('Invalid refresh response');
        }
    } catch (error: any) {
        console.error('Token refresh failed:', error);
        await logout();
        return false;
    }
};
