import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Resume from './Resume';
import Applications from './Applications';
import Summary from './Summary';

interface Props {
	// Define your component's props here
}

const OverviewTab: React.FC<Props> = ({}) => {
	return (
		<Grid container spacing={2} flexGrow={1}>
			<Grid container spacing={2} xs={12} md={8}>
				<Grid xs={12}>
					<Summary 
						title="Candidate Snapshot"
						loadingText="Summarizing candidate profile"
						refinementButtons={
							[
								{
									label: 'PREVIOUS EXPERIENCE',
									onClick: () => console.log('Previous experience')
								},
								{
									label: 'LOCATION',
									onClick: () => console.log('Location')
								},
								{
									label: 'EDUCATION',
									onClick: () => console.log('Education')
								},
								{
									label: 'SKILLS',
									onClick: () => console.log('Skills')
								}
							]
						}
					/>
				</Grid>
				<Grid xs={12}>
					<Resume />
				</Grid>
			</Grid>
			<Grid xs={12} md={4}>
				<Applications />
			</Grid>
		</Grid>
	);
};

export default OverviewTab;
