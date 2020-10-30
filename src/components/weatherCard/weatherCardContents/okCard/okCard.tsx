import React, { Fragment, FunctionComponent, useState } from 'react';
import { CardMedia, CardContent, Grid, Typography, Card, CardActionArea } from '@material-ui/core';
import { useStyles } from '../../../../hooks/useStyles';
import { IOkCardProps, IOkCardState } from '../../../weatherline/models/interfaces';

export const OkCard: FunctionComponent<IOkCardProps> = (props: IOkCardProps) => {
	const getInitialState = (): IOkCardState => {
		return {
			isFirstCall: true,
			image: props.image,
			city: props.city,
			description: props.description,
			temperature: props.temperature,
			country: props.country,
		};
	};

	const [state] = useState<Readonly<IOkCardState>>(getInitialState());
	let mutableState = { ...state } as IOkCardState;

	const classes = useStyles();
	mutableState.isFirstCall = false;
	return (
		<Fragment>
			<Card className={classes.root}>
				<CardActionArea className={classes.actionArea}>
					<CardMedia
						className={classes.media}
						image={state.image!.toString()}
						title={state.city + ', ' + state.country!.toLocaleUpperCase()}
					/>

					<CardContent>
						<Grid container={true} direction="row" justify="space-between" alignItems="center">
							<Typography gutterBottom variant="h5" component="h2">
								{state.city + ', ' + state.country!.toUpperCase()}
							</Typography>
							<Typography gutterBottom variant="h5" component="h2">
								{state.temperature}
							</Typography>
						</Grid>

						<Typography variant="body2" color="textSecondary" component="p">
							{state.description}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Fragment>
	);
};
