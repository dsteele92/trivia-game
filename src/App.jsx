import React from 'react';
import Style from './app.module.scss';

import { PageWrapper, SetUp } from 'components';

function App() {
	return (
		<div className={Style.App}>
			<SetUp />
		</div>
	);
}

export default App;
