import {Text, TouchableOpacity, View} from 'react-native';
import {PaymentButtonProps} from '@/types/props.ts';

function PaymentButton({noOfSeats, price, onPay}: PaymentButtonProps) {
    return (
        <View className={'absolute bottom-0 p-4 pb-5 w-full rounded-t-xl shadow-md bg-white'}>
            <View className={'flex-row items-center justify-between'}>
                <View>
                    <Text className={'text-xl font-okra font-semibold'}>Amount</Text>
                    <Text className={'text-sm text-gray-700 font-okra font-medium'}>Tax Included</Text>
                </View>

                <View className={'items-center'}>
                    <Text className={'text-lg font-okra font-medium'}>₹{(price * noOfSeats).toFixed(0)}</Text>
                    <Text className={'text-gray-500 text-sm line-through font-okra font-medium'}>₹{(noOfSeats * price - (noOfSeats * price > 200 ? 100 : 0)).toFixed(0)}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={onPay} className={'my-4 p-3 bg-tertiary rounded-xl justify-center items-center'}>
                <Text className={'text-white text-xl font-okra font-semibold'}>Pay Now!</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PaymentButton;
