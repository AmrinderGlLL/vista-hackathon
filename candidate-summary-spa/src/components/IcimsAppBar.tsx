// import { Tabs as MuiTabs, Tab as MuiTab } from '@mui/material';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import { makeStyles } from 'tss-react/mui';

import { Logo as IcimsLogo } from '@icims-design-system/mui-core';
// import { Tab as TabType } from '../types/types';
// import { SyntheticEvent } from 'react';

export interface IcimsAppBarProps {
	// readonly data: TabType[];
	// readonly value: TabType['id'] | false;
	// readonly onChange: (tabId: TabType['id']) => void;
}

const useStyles = makeStyles()((theme) => ({
	defaultLogo: {
		width: '60px',
		height: '20px',
		color: theme.palette.common.white
	},
	quickLinksIcon: {
		color: theme.palette.common.white
	}
}));

export default function IcimsAppBar({}: IcimsAppBarProps) {
	// const handleChange = (_event: SyntheticEvent<Element, Event>, newValue: string) => {
	// 	onChange(newValue);
	// };

	const { classes } = useStyles();

	return (
		<AppBar
			position="static"
			sx={{
				color: '#fff',
				background: '#222222',
				backgroundColor: '#222222'
			}}
		>
			<Toolbar>
				<IconButton aria-label="delete">
					<AppsIcon className={classes.quickLinksIcon} />
				</IconButton>
				<IcimsLogo classes={{svg: classes.defaultLogo}} />
			</Toolbar>
		</AppBar>
	);
}
