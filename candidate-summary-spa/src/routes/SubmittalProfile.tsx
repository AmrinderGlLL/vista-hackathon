import { Box, Chip } from "@mui/material"
import SubmittalHeader from '@/components/SubmittalHeader'
import { ProfileCard } from "@icims-design-system/mui-core"
import { useQuery } from '@tanstack/react-query';
import { Person as PersonType } from '../types/types';
import { personQuery } from '../api/person';
import Tabs from '@/components/Tabs';
import { useState } from "react";
import ApplicationTab from "@/components/ApplicationTab";
import Grid from '@mui/material/Unstable_Grid2';
import { AdvanceRejectButtons } from "ignite-advance-reject";
import { useParams } from 'react-router-dom';


export default function SubmittalProfile() {
	const { submittalId } = useParams();
	
	const { data: person, isFetching: isFetchingPerson } = useQuery<PersonType>(personQuery(submittalId!));
	const [tabId, setTabId] = useState<string>('tab1');

	const tabData = [
		{ id: 'tab1', name: 'Application', component: <ApplicationTab />},
		{ id: 'tab2', name: 'Activity', component: <Box>Activity</Box> },
		{ id: 'tab3', name: 'Notes' },
		{ id: 'tab4', name: 'Messages' },
		{ id: 'tab5', name: 'Feedback' },
		{ id: 'tab6', name: 'Offer' },
		{ id: 'tab7', name: 'Additional Info' }
	]

	return(
		<Box display="flex" flexDirection="column" flexGrow={1}>
			<SubmittalHeader />
			<Box id="SubmittalSubheader" display='flex' alignItems='center'>
				{isFetchingPerson ? <ProfileCard name='' skeleton /> :
				<ProfileCard
					name={person?.name.displayName}
					profileId={person?.id}
					title={person?.title}
					org={person?.org}
					email={person?.email}
					phone={person?.phone}
					address={person?.address}
					url={person?.url}
					onClick={() => window.location.href = '/person/1'}
				/>}
				<Grid direction='column' container spacing={3} >
					<Grid>
						<Chip
							label='New Submissions / Recruiter Submitted'
						/>
					</Grid>
					<Grid>
						<Chip
							color='primary'
							label='Candidates to Review'
						/>
					</Grid>
				</Grid>
				<Box ml='auto' mb='auto' mr='8px' mt='8px'>
					<AdvanceRejectButtons selectedCandidates={[]} />
				</Box>
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
	)
}
