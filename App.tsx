import './global.css';
import Navigation from '@/navigation/Navigation';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@/service/queryClient';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Navigation />
        </QueryClientProvider>
    );
}

export default App;
