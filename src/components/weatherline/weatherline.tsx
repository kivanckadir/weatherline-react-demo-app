import {
	Grid,
	AppBar,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	BottomNavigation,
	Button,
} from '@material-ui/core';
import React, { ChangeEvent, Component, Fragment } from 'react';
import { TEMP_DATA } from '../../dummy/data';
import Api from '../../service/api';
import { WeatherCard } from '../weatherCard';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { IWeatherlineProps, IWeatherlineState } from './models/interfaces';
import SiteLogo from '../../assets/images/logo.png';

let temp: string[] = TEMP_DATA;

export class Weatherline extends Component<IWeatherlineProps, IWeatherlineState> {
	state: Readonly<IWeatherlineState> = {
		isFetching: false,
		fetchMethod: 'button',
		dataComesFrom: 'temp',
		showedCities: [],
	};

	mutableState: IWeatherlineState = { ...this.state };

	componentDidMount() {
		this.startRequestLoopToGetCities(this.getRequestCount(), this.getTimeInterval());
	}

	startRequestLoopToGetCities = async (count: number, millisecond: number) => {
		if (count === 0) {
			return;
		}

		this.updateState({ isFetching: true });

		let counter = 0;
		await this.getCity();
		counter++;

		const interval = setInterval(async () => {
			if (counter === count) {
				clearInterval(interval);
				this.updateState({ isFetching: false });
				return;
			}

			await this.getCity();
			counter++;

			if (counter === count) {
				clearInterval(interval);
				this.updateState({ isFetching: false });
				return;
			}
		}, millisecond);
	};

	getCity = async () => {
		let city: string | undefined;
		if (this.mutableState.dataComesFrom === 'temp') {
			city = temp[Math.floor(Math.random() * temp.length)];
			temp = temp.filter((item) => item !== city);
		} else if (this.mutableState.dataComesFrom === 'api') {
			const cityInfo = await Api.getCitiesRandomly({
				limit: 1,
				offset: Math.floor(Math.random() * 10000),
			});
			city = cityInfo.data[0].city;

			if (this.mutableState.showedCities.includes(city)) {
				await this.getCity();
				return;
			}
		}
		this.updateState({ showedCities: [...this.mutableState.showedCities, city!] });
	};

	handleFetchMethodRadioCheckedChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
		this.updateState({ fetchMethod: value as any });
	};

	handleFetchFromRadioCheckedChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
		value: string
	) => {
		temp = TEMP_DATA;
		this.updateState({
			dataComesFrom: value as any,
			showedCities: [],
		});

		await this.startRequestLoopToGetCities(this.getRequestCount(), this.getTimeInterval());
	};

	handleFetchMoreDataClick = async () => {
		await this.startRequestLoopToGetCities(this.getRequestCount(), this.getTimeInterval());
	};

	handleScrollAtBottom = async () => {
		if (this.mutableState.fetchMethod === 'infinite-scroll') {
			if (this.mutableState.isFetching === false) {
				await this.startRequestLoopToGetCities(this.getRequestCount(), this.getTimeInterval());
			}
		}
	};

	getTimeInterval = () => (this.mutableState.dataComesFrom === 'api' ? 3000 : 0);

	getRequestCount = () =>
		this.mutableState.dataComesFrom === 'api' ? 5 : temp.length >= 10 ? 10 : temp.length;

	updateState(properties: Partial<IWeatherlineState>) {
		this.mutableState = { ...this.mutableState, ...properties };
		this.setState({ ...this.state, ...this.mutableState });
	}

	render() {
		return (
			<BottomScrollListener triggerOnNoScroll={false} onBottom={this.handleScrollAtBottom}>
				<Fragment>
					<Grid container={true} spacing={3} direction={'column'} alignItems={'stretch'}>
						<Grid item={true}>
							<AppBar position="static">
								<Grid
									container={true}
									direction={'row'}
									justify="space-between"
									alignItems={'center'}
									style={{ padding: '15px' }}>
									<Grid item={true}>
										<img width={200} alt="" src={SiteLogo} />
									</Grid>

									<Grid item={true}>
										<FormControl component="fieldset" disabled={this.state.isFetching}>
											<FormLabel component="legend" style={{ color: 'white' }}>
												Fetch From:
											</FormLabel>
											<RadioGroup onChange={this.handleFetchFromRadioCheckedChange}>
												<FormControlLabel
													value="temp"
													checked={this.state.dataComesFrom === 'temp'}
													control={<Radio />}
													label="Temp (Fast)"
												/>
												<FormControlLabel
													value="api"
													checked={this.state.dataComesFrom === 'api'}
													defaultChecked={true}
													control={<Radio />}
													label="Api (w/Timer)"
												/>
											</RadioGroup>
										</FormControl>

										<FormControl component="fieldset">
											<FormLabel component="legend" style={{ color: 'white' }}>
												Fetch Method:
											</FormLabel>
											<RadioGroup onChange={this.handleFetchMethodRadioCheckedChange}>
												<FormControlLabel
													value="button"
													checked={this.state.fetchMethod === 'button'}
													control={<Radio />}
													label="w/Button"
												/>
												<FormControlLabel
													value="infinite-scroll"
													checked={this.state.fetchMethod === 'infinite-scroll'}
													control={<Radio />}
													label="w/Infinite Scroll"
												/>
											</RadioGroup>
										</FormControl>
									</Grid>
								</Grid>
							</AppBar>
						</Grid>

						<Grid item={true}>
							<Grid container={true} spacing={3}>
								{this.state.showedCities.map((element, index) => {
									return (
										<Grid item={true} xs={true} key={index}>
											<WeatherCard city={element} />
										</Grid>
									);
								})}
							</Grid>
						</Grid>

						{this.state.fetchMethod === 'button' ? (
							<Grid item={true}>
								<BottomNavigation>
									<Button
										variant="contained"
										color={'primary'}
										disabled={
											this.state.isFetching ||
											(this.state.dataComesFrom === 'temp' && temp.length === 0)
										}
										onClick={this.handleFetchMoreDataClick}>
										Fetch More Data
									</Button>
								</BottomNavigation>
							</Grid>
						) : null}
					</Grid>
				</Fragment>
			</BottomScrollListener>
		);
	}
}
