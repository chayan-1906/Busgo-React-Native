import {apis} from '@/utils/apis.ts';
import apiClient from '@/service/apiClient.ts';

export const getAllCities = async (city?: string) => {
    const {data} = await apiClient.get(apis.getAllCitiesApi(city));
    return data?.cities || [];
};
