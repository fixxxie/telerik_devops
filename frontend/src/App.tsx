import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import * as H from 'history';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { useLocation, useNavigate } from "react-router-dom";

import AppRoutes from './routes/AppRoutes'
import Api from './Api';
import AppContextWrapper from './context/App';
import { AppContext, AppContextType } from './context/App';
import User from './User';

interface Props{
	navigate: Function,
	location: H.Location,
};

interface State {
	context: AppContextType,
	initialized: boolean
}

class App extends React.Component<Props, State> {

	constructor(props: Props, state: State) {
		super(props);

		// Configuration of external libraries
		axios.defaults.withCredentials = true;

		this.state = { context: new AppContext(new Api(process.env.REACT_APP_API_ENDPOINT_URL as string), props.navigate, props.location), initialized: false };
	}

	componentDidMount() {
		this.state.context.api.isAuthenticated()
			.then((user) => {
				this.state.context.setAuthenticated(user as User);
				if (this.props.location.pathname === '/login') {
					this.props.navigate('/');
				}
			})
			.catch((error) => {
				if (error.response.status === 401) {
					if (this.props.location.pathname !== '/login') {
						this.props.navigate('/login');
					}
				}

				// Display generic backend error
			})
			.finally(() => {
				this.setState((state, props) => {
					return { initialized: true };
				});
			});
	}

	render() {
		return (
			<AppContextWrapper.Provider value={this.state.context}>
				<CssBaseline />
				<SnackbarProvider maxSnack={3}>
					{ this.state.initialized && (
						<AppRoutes />
					)}
				</SnackbarProvider>
			</AppContextWrapper.Provider>
		);
	}
}

function WithNavigate(props: {}) {
	const navigate = useNavigate();
	const location = useLocation();

	return <App {...props} navigate={navigate} location={location} />;
}

export default WithNavigate;
