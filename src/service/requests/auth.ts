import apiClient from '../apiClient.ts';
import {apis} from '@/utils/apis.ts';
import axios from 'axios';
import {getRefreshToken, removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken} from '../storage.ts';
import {resetAndNavigate} from '@/utils/NavigationUtils.ts';
import {screens} from '@/utils/constants.ts';

export const loginWithGoogle = async (idToken: string) => {
    const {data} = await apiClient.post(apis.loginApi, {idToken});
    setAccessToken(data?.accessToken);
    setRefreshToken(data?.refreshToken);
    return data?.user; // possibly undefined https://www.notion.so/Backend-2110c027172280e0a92ade4b3e160805?source=copy_link#2120c0271722804284a0e798d18ebbba
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
