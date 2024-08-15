import { Box, Link, Typography } from "@mui/material";

export default function submittalHeader() {
	return( 
		<Box
			sx={{
				minHeight: '72px',
				borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
				paddingLeft: '24px',
			}}
			alignContent='center'
			flexDirection='row'
			display='flex'
			alignItems='center'
		>
			<Link>
				<Typography variant="h3" component="h1" noWrap>
					jobTitle
				</Typography>
			</Link>
			<Typography
				id="job-header-number"
				variant="body2"
				noWrap
				sx={{
					marginLeft: '16px',
				}}
			>
				jobNumber
			</Typography>
			<Typography
				id="job-header-location"
				variant="body2"
				noWrap
				sx={{
					marginLeft: '16px',
				}}
			>
				jobLocation
			</Typography>
			<Box display="flex" alignItems={{ xs: 'start', sm: 'center' }} sx={{ marginLeft: '8px' }}>
				<Box ml={1} mt={{ xs: 0.5, sm: 1 }} mb={1} mr={1}>
					<div style={{
						width: '12px',
						height: '12px',
						borderRadius: '50%',
						backgroundColor: 'green'
					}} />
				</Box>
				<Typography
					id="job-status-text"
					component="h2"
					noWrap
					variant="h5"
					sx={{
						overflow: "hidden",
						textOverflow: 'ellipsis',
						'max-width': "150px",
						color: 'green'
					}}
				>
					jobStatusLabel
				</Typography>
			</Box>
		</Box>
	)
}
