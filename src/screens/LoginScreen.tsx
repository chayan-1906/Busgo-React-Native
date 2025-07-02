import {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {screens} from '@/utils/constants.ts';
import {loginWithGoogle} from '@/service/requests/auth.ts';
import {resetAndNavigate} from '@/utils/NavigationUtils.ts';
import {IOS_GOOGLE_CLIENT_ID, WEB_GOOGLE_CLIENT_ID} from "@/service/config.ts";
import AppleImage from '../../assets/images/apple.png';
import CoverImage from '../../assets/images/cover.jpeg';
import GoogleImage from '../../assets/images/google.png';

console.log('Google Client IDs:', {WEB_GOOGLE_CLIENT_ID, IOS_GOOGLE_CLIENT_ID});

GoogleSignin.configure({
    webClientId: WEB_GOOGLE_CLIENT_ID,
    iosClientId: IOS_GOOGLE_CLIENT_ID,
});

function LoginScreen() {
    const [phone, setPhone] = useState<string>('');

    const loginMutation = useMutation({
        mutationFn: loginWithGoogle,
        onSuccess: async (user) => {
            console.log('Login successful:', user);
            await resetAndNavigate(screens.homeScreen);
        },
        onError: (error: any) => {
            console.error('Login mutation failed:', error.response?.data || error.message);
        },
    });

    const handleGoogleSignIn = async () => {
        try {
            console.log('Starting Google Sign In...');
            await GoogleSignin.hasPlayServices();
            console.log('Play services available');

            const response = await GoogleSignin.signIn();
            console.log('Google Sign In response:', response);
            console.log('ID Token:', response?.data?.idToken?.substring(0, 50) + '...');

            if (!response?.data?.idToken) {
                console.error('No idToken received from Google');
                return;
            }

            loginMutation.mutate(response.data.idToken);
        } catch (error: any) {
            console.error('Google Sign In failed:', error.code, error.message);
        }
    };

    return (
        <View className={'gap-4'}>
            <Image source={CoverImage} className={'w-full h-64 bg-cover'}/>
            <View className={'p-4'}>
                <Text className={'font-okra-medium text-xl text-center'}>Create Account or Sign In</Text>
                <View className={'flex-row items-center my-4 mt-12 px-2 border border-black gap-2 rounded-md'}>
                    <Text className={'w-[10%] font-okra-bold text-base'}>+91</Text>
                    <TextInput value={phone} onChangeText={setPhone} maxLength={10} keyboardType={'number-pad'} placeholder={'Enter 10 digit phone number'} className={'font-okra h-11 w-[90%]'}/>
                </View>

                <TouchableOpacity onPress={handleGoogleSignIn} className={'my-4 py-3 px-4 bg-tertiary rounded-xl justify-center items-center'}>
                    <Text className={'text-white text-xl font-okra-bold'}>Let&apos;s Go</Text>
                </TouchableOpacity>

                <Text className={'my-8 text-sm text-center font-okra text-gray-700'}>------------ OR ------------</Text>

                <View className={'flex-row items-center justify-center gap-4'}>
                    <TouchableOpacity className={'border border-gray-300 rounded-md p-2'} onPress={handleGoogleSignIn}>
                        <Image source={GoogleImage} resizeMode={'contain'} className={'size-5'}/>
                    </TouchableOpacity>
                    <TouchableOpacity className={'border border-gray-300 rounded-md p-2'}>
                        <Image source={AppleImage} resizeMode={'contain'} className={'size-5'}/>
                    </TouchableOpacity>
                </View>

                <Text className={'text-center font-okra-medium text-sm text-gray-500 my-2 w-72 self-center'}>By signing up you agree to our Terms and Conditions and Privacy Policy</Text>
            </View>
        </View>
    );
}

export default LoginScreen;
