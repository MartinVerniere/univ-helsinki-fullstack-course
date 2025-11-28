import { WhatIsMyPlatform } from './src/components/examples/WhatIsMyPlatform';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';

const App = () => {
	return (
		<NativeRouter>
			<WhatIsMyPlatform />
		</NativeRouter>
	);
};

export default App;