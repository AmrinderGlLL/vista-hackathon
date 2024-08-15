import { Box, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import ListIcon from '@mui/icons-material/List';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useState } from "react";
import ResumeView from "./ResumeView";
import ExperienceView from "./ExperienceView";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	toggleButtonLabel: {
		paddingLeft: '8px',
		paddingRight: '8px'
	}
})

export default function Resume() {
	const [activeTab, setActiveTab] = useState<string | null>('Resume');
	const classes = useStyles();

	const handleTab = (
    event: React.MouseEvent<HTMLElement>,
    newTab: string | null,
  ) => {
		if (newTab !== null) {
			setActiveTab(newTab);
		}
  };

	return (
		<Paper
			sx={{
				margin: 0
			}}
		>
			<Box padding={'8px'}>
				{/* TODO: add classes with styles for the spans for padding */}
				<ToggleButtonGroup
					value={activeTab}
					exclusive
					onChange={handleTab}
				>
					<ToggleButton
						value="Resume"
					>
						<DescriptionIcon />
						<span className={classes.toggleButtonLabel}>Resume</span>
					</ToggleButton>
					<ToggleButton
						value="Experience"
					>
						<ListIcon />
						<span className={classes.toggleButtonLabel}>Experience</span>
					</ToggleButton>
					<ToggleButton
						value="LinkedIn"
					>
						<LinkedInIcon />
						<span className={classes.toggleButtonLabel}>LinkedIn</span>
					</ToggleButton>
					
				</ToggleButtonGroup>
			</Box>
			
			<Box padding={'8px'}>
				{activeTab === 'Resume' && <ResumeView />}
				{activeTab === 'Experience' && <ExperienceView />}
			</Box>
		</Paper>
	);
}
