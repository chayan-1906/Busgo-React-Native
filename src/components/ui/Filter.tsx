import {Text, TouchableOpacity, View} from 'react-native';
import {IFilterOption} from '@/types';
import {FilterProps} from '@/types/props.ts';

function Filter({options, selectedOption, setSelectedOption, multi, className}: FilterProps) {
	const isSelected = (option: IFilterOption): boolean => {
		if (multi) {
			return (selectedOption as IFilterOption[]).some(selected => selected.value === option.value);
		}
		return (selectedOption as IFilterOption).value === option.value;
	};

	const handlePress = (option: IFilterOption) => {
		if (multi) {
			const selectedArray = selectedOption as IFilterOption[];
			const exists = selectedArray.find(o => o.value === option.value);
			if (exists) {
				(setSelectedOption as (value: IFilterOption[]) => void)(selectedArray.filter(o => o.value !== option.value));
			} else {
				(setSelectedOption as (value: IFilterOption[]) => void)([...selectedArray, option]);
			}
		} else {
			(setSelectedOption as (value: IFilterOption) => void)(option);
		}
	};

	return (
		<View className={`flex-row mb-4 flex-wrap gap-3 ${className}`}>
			{options.map(option => (
				<TouchableOpacity key={option.value} className={`px-4 py-2 mx-1 rounded-lg ${isSelected(option) ? 'bg-tertiary' : 'bg-gray-300'}`} onPress={() => handlePress(option)}>
					<Text className={`text-sm font-okra-medium ${isSelected(option) ? 'text-white' : 'text-black'}`}>{option.label}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}

export default Filter;