import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { tabsQuery } from '../api/tabs';
import { Tab as TabType } from '../types/types';

export default function Tab() {
	const { tabId } = useParams();
	const { data } = useSuspenseQuery<TabType[]>(tabsQuery());

	const tab = data.find((tab) => tab.id === tabId);

	return (
		<Box p={2}>
			<Typography variant="h3">{tab?.name} Content</Typography>
		</Box>
	);
}
