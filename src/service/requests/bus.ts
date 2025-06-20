import apiClient from '@/service/apiClient.ts';
import {apis} from '@/utils/apis.ts';
import {ITicket} from '@/types';

export const searchBuses = async (from: string, to: string, date: string) => {
    const {data} = await apiClient.get(apis.searchBusesApi(from, to, date));
    return data?.buses || [];
};

export const getBusDetails = async (busExternalId: string) => {
    const {data} = await apiClient.get(apis.getBusDetailsApi(busExternalId));
    return data?.bus;
};

export const getTicketsForUser = async () => {
    const {data} = await apiClient.get(apis.getTicketsForUserApi);
    return data?.tickets as ITicket[];
};

export const bookTicket = async (busExternalId: string, date: string, seatNumbers: number[]) => {
    const {data} = await apiClient.post(apis.bookTicketApi, {busId: busExternalId, date, seatNumbers});
    return data.ticket as ITicket;
};
