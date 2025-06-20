import {Text, View} from 'react-native';
import {BookingItemProps} from '@/types/props.ts';

function BookItem({bookItem}: BookingItemProps) {
    return (
        <View>
            <Text>Book Item</Text>
        </View>
    );
}

export default BookItem;
