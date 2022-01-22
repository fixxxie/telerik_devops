import axios from 'axios';

class Api {
	private endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	isAuthenticated(): Promise<{}> {
		const promise = new Promise((resolve, reject) => {
			this.makeGet('/api/user')
				.then(function(response) {
					resolve(response.data);
				})
				.catch(function(error) {
					reject(error);
				});
		});

		return promise as Promise<{}>;
	}

	login(email: string, password: string): Promise<{}> {
		const promise = new Promise((resolve, reject) => {
			this.makeGet('/sanctum/csrf-cookie')
				.then((response) => {
					this.makePost('/api/login', { email: email, password: password })
						.then((response) => {
							resolve(response.data.user);
						})
						.catch((error) => {
							reject(error);
						});
				})
				.catch((error) => {
					reject(error);
				});
		});

		return promise as Promise<{}>;
	}

	listUserActivity(user_id: number): Promise<{}> {
		const promise = new Promise((resolve, reject) => {
			this.makeGet('/api/users/' + user_id + '/activity')
				.then((response) => {
					resolve(response.data.activity);
				})
				.catch((error) => {
					reject(error);
				});
			});

		return promise as Promise<{}>;
	}

	getBackendVersion() {
		const promise = new Promise((resolve, reject) => {
			this.makeGet('/api/version')
				.then((response) => {
					resolve(response.data.version);
				})
				.catch((error) => {
					reject(error);
				});
			});

		return promise as Promise<{}>;
	}

	private makeGet(url: string) {
		return axios.get(this.endpoint + url);
	}

	private makePost(url: string, params: {}) {
		return axios.post(this.endpoint + url, params,{
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}

export default Api;
