import React, {forwardRef} from 'react';
import {View} from 'react-native';

const CustomView = forwardRef<View, any>((props, ref) => {
    return React.createElement(View, {...props, ref});
});

CustomView.displayName = 'CustomView';

export default CustomView;
