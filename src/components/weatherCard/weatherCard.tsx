import React, { FunctionComponent, useState, useEffect, Fragment } from 'react';
import Api from '../../service/api';
import { CardStatus } from '../weatherline/models/enums';
import { IWeatherCardProps, IWeatherCardState } from '../weatherline/models/interfaces';
import { ErrorCard } from './weatherCardContents/errorCard';
import { LoadingCard } from './weatherCardContents/loadingCard';
import { OkCard } from './weatherCardContents/okCard';

export const WeatherCard: FunctionComponent<IWeatherCardProps> = (props: IWeatherCardProps) => {
	const getInitialState = (): IWeatherCardState => {
		return {
			isFirstCall: true,
			status: CardStatus.LOADING,
			city: props.city,
			data: {
				image: '',
				city: '',
				country: '',
				description: '',
				temperature: '',
			},
		};
	};

	const [state, setState] = useState<Readonly<IWeatherCardState>>(getInitialState());
	let mutableState = { ...state } as IWeatherCardState;
	const updateState = (properties: Partial<IWeatherCardState>) => {
		mutableState = { ...mutableState, ...properties };
		setState({ ...mutableState, ...properties });
	};

	useEffect(() => {
		if (!mutableState.isFirstCall) {
			mutableState.city = props.city;
			Api.getWeather(mutableState.city)
				.then((weatherData) => {
					updateState({
						status: CardStatus.OK,
						data: {
							image: weatherData.current.weather_icons[0],
							city: weatherData.location.name,
							description: weatherData.current.weather_descriptions[0],
							temperature: weatherData.current.temperature + '°C',
							country: weatherData.location.country,
						},
					});
				})
				.catch(() => {
					updateState({
						status: CardStatus.ERROR,
					});
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.city]);

	mutableState.isFirstCall = false;
	return (
		<Fragment>
			{state.status === CardStatus.LOADING ? (
				<LoadingCard />
			) : state.status === CardStatus.OK ? (
				<OkCard {...state.data} />
			) : state.status === CardStatus.ERROR ? (
				<ErrorCard city={state.city} />
			) : null}
		</Fragment>
	);
};
