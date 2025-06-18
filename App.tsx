import './global.css';
import Navigation from './src/navigation/Navigation';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/service/queryClient';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Navigation />
        </QueryClientProvider>
    );
}

export default App;
