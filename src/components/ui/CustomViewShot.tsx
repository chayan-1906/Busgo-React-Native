import React, {forwardRef} from 'react';
import ViewShot from 'react-native-view-shot';

const CustomViewShot = forwardRef<ViewShot, any>((props, ref) => {
	return React.createElement(ViewShot, {...props, ref});
});

CustomViewShot.displayName = 'CustomViewShot';

export default CustomViewShot;
