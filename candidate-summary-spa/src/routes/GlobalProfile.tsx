import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { ProfileCard } from '@icims-design-system/mui-core';
import { useState } from 'react';

import { personQuery } from '../api/person';
import { Person as PersonType } from '../types/types';
import Tabs from '@/components/Tabs';
import OverviewTab from '@/components/OverviewTab';

export default function GlobalProfile() {
	const { candidateId } = useParams();
	const { data: person, isFetching: isFetchingPerson } = useQuery<PersonType>(personQuery(candidateId!));
	const [tabId, setTabId] = useState<string>('tab1');

	const tabData = [
		{ id: 'tab1', name: 'Overview', component: <OverviewTab /> },
		{ id: 'tab2', name: 'Workflows', component: <Box>Workflows</Box> },
		{ id: 'tab3', name: 'Notes' },
		{ id: 'tab4', name: 'Messages' },
		{ id: 'tab5', name: 'Additional Info' }
	]

	return (
		<Box display="flex" flexDirection="column" flexGrow={1}>
			<Box>
				{isFetchingPerson ? <ProfileCard name='' skeleton /> :
				<ProfileCard
					name={person?.name.displayName as any}
					profileId={person?.id}
					title={person?.title}
					org={person?.org}
					email={person?.email}
					phone={person?.phone}
					address={person?.address}
					url={person?.url}
				/>}
			</Box>
			<Tabs 
				data={tabData}
				value={tabId}
				onChange={(tabId) => {setTabId(tabId)}}
			/>
			<Box id='TabContent' display="flex" flexDirection="column" flexGrow={1} bgcolor="#f5f5f5" p={2} height='100%'>
				{tabData.find((tab) => tab.id === tabId)?.component}
			</Box>
		</Box>
	);
}
