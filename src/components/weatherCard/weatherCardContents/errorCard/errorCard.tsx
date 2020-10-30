import { Card, CardActionArea, CardContent, Grid, Typography } from '@material-ui/core';
import React, { Fragment, FunctionComponent } from 'react';
import { useState } from 'react';
import { useStyles } from '../../../../hooks/useStyles';
import { IErrorCardProps, IErrorCardState } from '../../../weatherline/models/interfaces';

export const ErrorCard: FunctionComponent<IErrorCardProps> = (props: IErrorCardProps) => {
	const getInitialState = (): IErrorCardState => {
		return {
			isFirstCall: true,
			city: props.city,
		};
	};

	const [state] = useState<Readonly<IErrorCardState>>(getInitialState());
	let mutableState = { ...state } as IErrorCardState;

	const classes = useStyles();
	mutableState.isFirstCall = false;
	return (
		<Fragment>
			<Card className={classes.root}>
				<CardActionArea className={classes.actionArea}>
					<CardContent>
						<Grid container={true} direction="row" justify="space-between" alignItems="center">
							<Typography gutterBottom variant="h5" component="h2">
								{'Could not load weather information of ' + props.city + '.'}
							</Typography>
						</Grid>
					</CardContent>
				</CardActionArea>
			</Card>
		</Fragment>
	);
};
