import {BASE_URL} from '../service/config.ts';

export const apis = {
	loginApi: `${BASE_URL}/user/login`,
	refreshTokenApi: `${BASE_URL}/user/refreshToken`,

	getAllCitiesApi: (city?: string) => `${BASE_URL}/city${city ? `?city=${city}` : ''}`,
	searchBusesApi: (from: string, to: string, date: string, tags: string[], sortBy?: string) => `${BASE_URL}/bus/search?from=${from}&to=${to}&date=${date}&tags=${tags.map(encodeURIComponent).join(',')}${sortBy ? `&sortBy=${encodeURIComponent(sortBy)}` : ''}`,
	getBusDetailsApi: (busExternalId: string) => `${BASE_URL}/bus?busId=${busExternalId}`,

	getTicketsForUserApi: `${BASE_URL}/ticket`,
	bookTicketApi: `${BASE_URL}/ticket`,
};
