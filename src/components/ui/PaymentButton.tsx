import {Text, TouchableOpacity, View} from 'react-native';
import {PaymentButtonProps} from '@/types/props.ts';

function PaymentButton({noOfSeats, price, onPay}: PaymentButtonProps) {
    return (
        <View className={'absolute bottom-0 p-4 pb-5 w-full rounded-t-xl shadow-md bg-white'}>
            <View className={'flex-row items-center justify-between'}>
                <View>
                    <Text className={'text-xl font-okra-semibold'}>Amount</Text>
                    <Text className={'text-sm text-gray-700 font-okra-medium'}>Tax Included</Text>
                </View>

                <View className={'items-center'}>
                    <Text className={'text-lg font-okra-bold'}>₹{(price * noOfSeats).toFixed(0)}</Text>
                    <Text className={'text-gray-500 text-sm line-through font-okra-medium'}>₹{(noOfSeats * price - (noOfSeats * price > 200 ? 100 : 0)).toFixed(0)}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={onPay} className={'my-4 py-3 px-4 bg-tertiary rounded-xl justify-center items-center'}>
                <Text className={'text-white text-xl font-okra-semibold'}>Pay Now!</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PaymentButton;
