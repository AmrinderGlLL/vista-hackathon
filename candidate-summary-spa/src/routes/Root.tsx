import * as React from 'react';
// import { QueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { analyticInfoQuery } from '@/api/analyticInfo';
import { tabsQuery } from '@/api/tabs';
// import Tabs from '@/components/Tabs';
import IcimsAppBar from '@/components/IcimsAppBar';
// import { AnalyticInfo, Tab } from '../types/types';

const loader = (queryClient: QueryClient) => () => {
	void queryClient.ensureQueryData(analyticInfoQuery());
	void queryClient.ensureQueryData(tabsQuery());

	// Return empty object because react-query cache is where we want to retrieve the data from
	return {};
}

export default function Root() {
	// const { data: analyticInfo } = useSuspenseQuery<AnalyticInfo>(analyticInfoQuery());
	// const { data: tabsData } = useSuspenseQuery<Tab[]>(tabsQuery());
	const navigate = useNavigate();

	const { candidateId, submittalId } = useParams();

	React.useEffect(() => {
		if (candidateId === undefined && submittalId === undefined) {
			navigate('/person/1', { replace: true });
		}
	}, [candidateId, submittalId, navigate]);

	// const handlePersonChange = (candidateId: string) => {
	// 	navigate(`/candidateId/${candidateId}`);
	// };

	return (
		<Box height="100%" display="flex" flexDirection="column">
			<IcimsAppBar />
			
			{/* <Tabs data={tabsData} value={tabId!} onChange={handleTabChange} /> */}
			<Box overflow="auto" display="flex" flexDirection="column" flexGrow={1}>
				<Outlet />
			</Box>
		</Box>
	);
}

Root.loader = loader;
