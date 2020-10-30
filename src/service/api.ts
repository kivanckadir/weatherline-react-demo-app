import { ICityInfo, IWeatherInfo } from './models/interfaces';

export default class Api {
	static WEATHERSTACK_BASE_URL = 'http://api.weatherstack.com';
	static RAPID_BASE_URL = 'https://wft-geo-db.p.rapidapi.com';
	static WEATHERSTACK_API_KEY = '47fd62fc1d42a0b8775ee769de3582b0';
	static RAPID_API_KEY = '55e9e3c58dmsh501ce149fa126f5p14f981jsn1a7ac5c0f594';

	static async getWeather(name: string): Promise<IWeatherInfo> {
		try {
			const response = await fetch(
				Api.WEATHERSTACK_BASE_URL +
					'/forecast' +
					'?access_key=' +
					Api.WEATHERSTACK_API_KEY +
					'&query=' +
					name
			);

			if (response.ok) {
				return await response.json();
			} else {
				throw new Error(response.statusText);
			}
		} catch (error) {
			console.error('failed to fetch weather information.', error);
			throw error;
		}
	}

	static async getCitiesRandomly(p: { offset: number; limit: number }): Promise<ICityInfo> {
		try {
			const response = await fetch(
				Api.RAPID_BASE_URL +
					'/v1/geo/cities' +
					'?limit=' +
					p.limit.toString() +
					'&offset=' +
					p.offset.toString(),
				{
					method: 'GET',
					headers: {
						'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
						'x-rapidapi-key': Api.RAPID_API_KEY,
					},
				}
			);

			if (response.ok) {
				return await response.json();
			} else {
				throw new Error(response.statusText);
			}
		} catch (error) {
			console.error('failed to fetch city information.', error);
			throw error;
		}
	}
}
