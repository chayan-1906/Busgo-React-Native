import {Text, TouchableOpacity, View} from 'react-native';
import {navigate} from '@/utils/NavigationUtils.ts';
import {screens} from '@/utils/constants.ts';
import {IBus} from '@/types';
import LinearGradient from 'react-native-linear-gradient';
import {StarIcon} from 'react-native-heroicons/solid';

function BusItem({item: bus}: {item: IBus}) {
    return (
        <LinearGradient colors={['#CF3239', '#FDBB8A']} start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}} style={{shadowOffset: {width: 0, height: 3}, shadowOpacity: 0.2, shadowRadius: 5, elevation: 6, borderRadius: 12, padding: 2}}>
            <View className={'bg-white/80 m-[1px] rounded-xl'}>
                <View className={'mb-4 p-4 rounded-lg shadow-sm'}>
                    {/** Bus Company, Rating, Reviews */}
                    <View className={'flex-row justify-between'}>
                        <View className={'flex-row gap-2 items-center mb-2'}>
                            <View className={'flex-row items-center'}>
                                <LinearGradient colors={['#CF3239', '#FC5431']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={{width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text className={'text-2xl text-white font-okra-extra-bold'}>{bus.company[0]}</Text>
                                </LinearGradient>
                            </View>

                            <View className={''}>
                                <Text className={'text-lg text-gray-900 font-okra-bold'}>{bus.company}</Text>
                                <View className={'flex-row gap-2 items-center'}>
                                    <Text className={'text-sm text-gray-700 font-okra-medium'}>{bus.busTags.join(', ')}</Text>
                                    <StarIcon color={'#D78A5b'} size={16} />
                                    <Text className={'text-sm text-gray-700 font-okra-medium'}>
                                        {bus.rating} <Text>({bus.totalReviews})</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/** Price */}
                        <View className={'items-end'}>
                            <View className={'flex-row items-center gap-2'}>
                                <Text className={'text-xl text-emerald-600 font-okra-bold'}>₹{bus.price}</Text>
                                <Text className={'text-sm text-gray-400 font-okra line-through'}>₹{bus.originalPrice}</Text>
                            </View>
                            <Text className={'text-sm text-emerald-600 font-okra-medium'}>{(((bus.originalPrice - bus.price) / bus.originalPrice) * 100).toFixed(2)}% discount</Text>
                        </View>
                    </View>

                    {/** Route */}
                    <View className={'mt-6 bg-gray-50 justify-between rounded-xl p-4'}>
                        <View className={'flex-row gap-4'}>
                            <View className={'flex-1 items-center'}>
                                <Text className={'mb-1 uppercase text-xs text-gray-500 font-okra'}>Departure</Text>
                                <Text className={'text-lg text-gray-900 font-okra-bold'}>{new Date(bus.departureTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Text>
                                <Text className={'mt-1 text-sm text-gray-600 font-okra'}>{bus.from}</Text>
                            </View>

                            <View className={'items-center justify-center flex-1'}>
                                <Text className={'my-2 uppercase text-xs text-gray-500'}>Duration</Text>
                                <View className={'relative w-full h-0.5 bg-gray-300'}>
                                    <View className={'absolute top-0 left-0 right-0 h-0.5 bg-tertiary w-1/2'} />
                                    <View className={'absolute -top-1 left-0 size-2.5 rounded-full bg-tertiary'} />
                                    <View className={'absolute -top-1 right-0 size-2.5 rounded-full bg-gray-300'} />
                                </View>
                                <Text className={'text-sm font-okra-medium text-gray-700 mt-2'}>{bus.duration}</Text>
                            </View>

                            <View className={'flex-1 items-center'}>
                                <Text className={'mb-1 uppercase text-xs text-gray-500 font-okra'}>Arrival</Text>
                                <Text className={'text-lg text-gray-900 font-okra-bold'}>{new Date(bus.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Text>
                                <Text className={'mt-1 text-sm text-gray-600 font-okra'}>{bus.to}</Text>
                            </View>
                        </View>
                    </View>

                    <View className={'flex-row items-center justify-between mt-2'}>
                        <Text className={'text-sm text-gray-600 font-okra'}>{bus.availableSeats} seats left</Text>
                        <TouchableOpacity className={'bg-tertiary rounded-lg px-3 py-2'} onPress={() => navigate(screens.seatSelectionScreen, {busExternalId: bus.busExternalId})}>
                            <Text className={'text-sm text-white font-okra-medium'}>Book Now</Text>
                        </TouchableOpacity>
                    </View>

                    {/** Badges */}
                    <View className={'flex-row gap-2 mt-2 flex-wrap'}>
                        {bus.badges.map((badge: string) => {
                            return (
                                <View key={badge} className={'rounded-full px-2 py-1 bg-primary'}>
                                    <Text className={'text-xs text-white font-okra-medium'}>{badge}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}

export default BusItem;
