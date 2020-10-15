import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Bag from "./components/Bag/Bag";
import {StoreProvider} from "./store/store";

import "./styles.sass";

function App() {
	return (
		<div className="container">
			<StoreProvider>
				<Router>
					<Switch>
						<Route path="/">
							<Bag/>
						</Route>
					</Switch>
				</Router>
			</StoreProvider>
		</div>
	);
}

export default App;
