import {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useMutation} from '@tanstack/react-query';
import {screens} from '@/utils/constants.ts';
import {loginWithGoogle} from '@/service/requests/auth.ts';
import {resetAndNavigate} from '@/utils/NavigationUtils.ts';
import {IOS_GOOGLE_CLIENT_ID, WEB_GOOGLE_CLIENT_ID} from '@env';

GoogleSignin.configure({
    webClientId: WEB_GOOGLE_CLIENT_ID,
    iosClientId: IOS_GOOGLE_CLIENT_ID,
});

function LoginScreen() {
    const [phone, setPhone] = useState<string>('');

    const loginMutation = useMutation({
        mutationFn: loginWithGoogle,
        onSuccess: async () => {
            await resetAndNavigate(screens.homeScreen);
        },
        onError: (error: any) => {
            console.error('Login failed', error);
        },
    });

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            loginMutation.mutate(response?.data?.idToken as string);
        } catch (error: any) {
            console.error('Google Sign In failed', error);
        }
    };

    return (
        <View className={'gap-4'}>
            <Image source={require('../assets/images/cover.jpeg')} className={'w-full h-64 bg-cover'} />
            <View className={'p-4'}>
                <Text className={'font-okra-semibold text-xl text-center'}>Create Account or Sign In</Text>
                <View className={'flex-row items-center my-4 mt-12 px-2 border border-black gap-2 rounded-md'}>
                    <Text className={'w-[10%] font-okra-bold text-base'}>+91</Text>
                    <TextInput value={phone} onChangeText={setPhone} maxLength={10} keyboardType={'number-pad'} placeholder={'Enter 10 digit phone number'} className={'font-okra h-11 w-[90%]'} />
                </View>

                <TouchableOpacity className={'bg-tertiary rounded-md justify-center items-center p-3'} onPress={handleGoogleSignIn}>
                    <Text className={'uppercase text-white font-okra-semibold'}>Let's Go</Text>
                </TouchableOpacity>

                <Text className={'my-8 text-sm text-center font-okra text-gray-700'}>------------ OR ------------</Text>

                <View className={'flex-row items-center justify-center gap-4'}>
                    <TouchableOpacity className={'border border-gray-300 rounded-md p-2'} onPress={handleGoogleSignIn}>
                        <Image source={require('../assets/images/google.png')} resizeMode={'contain'} className={'size-5'} />
                    </TouchableOpacity>
                    <TouchableOpacity className={'border border-gray-300 rounded-md p-2'}>
                        <Image source={require('../assets/images/apple.png')} resizeMode={'contain'} className={'size-5'} />
                    </TouchableOpacity>
                </View>

                <Text className={'text-center font-okra-medium text-sm text-gray-500 my-2 w-72 self-center'}>By signing up you agree to our Terms and Conditions and Privacy Policy</Text>
            </View>
        </View>
    );
}

export default LoginScreen;
