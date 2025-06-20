import {BASE_URL} from '../service/config.ts';

export const apis = {
    loginApi: `${BASE_URL}/user/login`,
    refreshTokenApi: `${BASE_URL}/user/refreshToken`,

    searchBusesApi: (from: string, to: string, date: string) => `${BASE_URL}/bus/search?from=${from}&to=${to}&date=${date}`,
    getBusDetailsApi: (busExternalId: string) => `${BASE_URL}/bus?busId=${busExternalId}`,

    getTicketsForUserApi: `${BASE_URL}/ticket`,
    bookTicketApi: `${BASE_URL}/ticket`,
};
