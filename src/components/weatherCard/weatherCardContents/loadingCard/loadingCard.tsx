import { Card, CardActionArea } from '@material-ui/core';
import React, { Fragment, FunctionComponent } from 'react';
import ContentLoader from 'react-content-loader';
import { useStyles } from '../../../../hooks/useStyles';
import { ILoadingCardProps } from '../../../weatherline/models/interfaces';

export const LoadingCard: FunctionComponent<ILoadingCardProps> = () => {
	const classes = useStyles();
	const x = 0;
	const y = 5;

	const roundX = 0;
	const roundY = 0;

	const heights = [75, 20, 20, 20];

	return (
		<Fragment>
			<Card className={classes.root}>
				<CardActionArea className={classes.actionArea}>
					<ContentLoader width="100%" height="100%" speed={1} interval={0.1}>
						<rect x={x} y={0} rx={roundX} ry={roundY} width="100%" height={heights[0]} />
						<rect
							x={x}
							y={y * 1 + heights[0]}
							rx={roundX}
							ry={roundY}
							width="65%"
							height={heights[1]}
						/>
						<rect
							x={x}
							y={y * 2 + heights[0] + heights[1]}
							rx={roundX}
							ry={roundY}
							width="80%"
							height={heights[2]}
						/>
						<rect
							x={x}
							y={y * 3 + heights[0] + heights[1] + heights[2]}
							rx={roundX}
							ry={roundY}
							width="75%"
							height={heights[3]}
						/>
					</ContentLoader>
				</CardActionArea>
			</Card>
		</Fragment>
	);
};
