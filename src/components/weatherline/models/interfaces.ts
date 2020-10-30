import { CardStatus } from './enums';

export interface FunctionComponentState {
	isFirstCall: boolean;
}

export interface IWeatherCardState extends FunctionComponentState, IWeatherCardProps {
	status: CardStatus;
	data: IOkCardProps;
}

export interface IWeatherCardProps {
	city: string;
}

export interface IWeatherlineState {
	showedCities: string[];
	isFetching: boolean;
	fetchMethod: 'button' | 'infinite-scroll';
	dataComesFrom: 'api' | 'temp';
}

export interface IWeatherlineProps {}

export interface IOkCardState extends FunctionComponentState, IOkCardProps {}
export interface IOkCardProps {
	image: URL | string;
	city: string;
	description: string;
	temperature: string;
	country: string;
}

export interface IErrorCardState extends FunctionComponentState, IErrorCardProps {}
export interface IErrorCardProps {
	city: string;
}

export interface ILoadingCardState extends FunctionComponentState, ILoadingCardProps {}
export interface ILoadingCardProps {}
