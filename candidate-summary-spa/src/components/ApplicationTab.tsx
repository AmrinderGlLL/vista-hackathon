import React from 'react';
import Resume from './Resume';
import { Box } from '@mui/material';
import Summary from './Summary';

const ApplicationTab: React.FC<Props> = () => {
	return (
		<Box alignContent='center'>
			<Box maxWidth='65%' marginLeft='auto' marginRight='auto' >
				<Summary 
					title="Application Snapshot"
					loadingText="Summarizing application profile"
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
				<Box height='20px'/>
				<Resume />
			</Box>
		</Box>
	);
};

export default ApplicationTab;
