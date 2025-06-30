export const scheme = 'busgo';
export const generateBusDetailsLink = (busExternalId: string) => `${scheme}://bus/${busExternalId}`;
