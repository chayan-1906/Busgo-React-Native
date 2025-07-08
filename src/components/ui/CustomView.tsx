import React from 'react';
import {View, ViewProps} from "react-native";

interface ICustomViewProps extends ViewProps {
	key?: string | number;
}

function CustomView({key, ...props}: ICustomViewProps) {
	return <View {...props}/>;
}

export default CustomView;
