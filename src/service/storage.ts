import {MMKV} from 'react-native-mmkv';
import {storage} from '../utils/constants.ts';

export const mmkv = new MMKV();

export const setAccessToken = (token: string) => {
    mmkv.set(storage.accessToken, token);
    console.log('accessToken set to mmkv', token);
};

export const getAccessToken = () => {
    const accessToken = mmkv.getString(storage.accessToken);
    console.log('accessToken', accessToken);
    return accessToken;
};

export const removeAccessToken = () => {
    mmkv.delete(storage.accessToken);
    console.log('accessToken deleted from mmkv');
};

export const setRefreshToken = (token: string) => {
    mmkv.set(storage.refreshToken, token);
    console.log('refreshToken set to mmkv', token);
};

export const getRefreshToken = () => {
    const refreshToken = mmkv.getString(storage.refreshToken);
    console.log('refreshToken', refreshToken);
    return refreshToken;
};

export const removeRefreshToken = () => {
    mmkv.delete(storage.refreshToken);
    console.log('refreshToken deleted from mmkv');
};
