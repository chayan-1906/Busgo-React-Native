import './global.css';
import {StatusBar, StyleSheet, Text, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function App() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <Text className={'text-red-500 font-bold text-3xl font-okra'}>App</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
});

export default App;
