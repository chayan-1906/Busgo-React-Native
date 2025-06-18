import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 60,
            retry: 1,
        },
    },
});

export default queryClient;
