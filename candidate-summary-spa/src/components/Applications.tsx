// import { Tabs as MuiTabs, Tab as MuiTab } from '@mui/material';
// import { Tab as TabType } from '../types/types';
import { useEffect, useState, useMemo } from 'react';
import { Button, Box, Paper, Typography, Link, Skeleton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate, useParams } from 'react-router-dom';


export interface ApplicationsProps {
}

export default function Applications({}: ApplicationsProps) {
	const navigate = useNavigate();
	const { candidateId } = useParams();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, [setIsLoading]);

	const handleViewApplication = () => {
		navigate(`/submittal/${candidateId}/candidate/${candidateId}`, { replace: true });
	};

	const cardContentSkeletons = useMemo(
    () =>
      // eslint-disable-next-line no-magic-numbers
      [...Array(isLoading ? 3 : 0)].map((e, i) => (
				<Box
					key={`application-card-detail-skeleton-${i}`}
					my={2}
					p={2}
					sx={{
						border: '1px solid rgba(0, 0, 0, 0.26)',
						borderRadius: '4px'
					}}
				>
					<Skeleton  width="100%" />
					<Skeleton  width="100%" />
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Box display="flex" flexDirection="column" width="75%">
							<Skeleton width="85%" />
							<Skeleton width="85%" />
							<Skeleton width="85%" />
						</Box>
						<Skeleton width="50px" height="50px" variant="circular" />
					</Box>
				</Box>
      )),
    [isLoading]
  );

	// TODO: add an endpoint to fetch applications & showing loading?

	return (
		<Paper sx={{ p: 2 }}>
			<Typography variant="h2" fontWeight="800">
				Applications
			</Typography>
			{
				isLoading ? cardContentSkeletons :
				<Box
					my={2}
					p={2}
					sx={{
						border: '1px solid rgba(0, 0, 0, 0.26)',
						borderRadius: '4px'
					}}
				>
					<Box p={2}>
						<Link href="#">
							<Typography>
								Test Batch Job
							</Typography>
						</Link>
						<Typography variant="caption" display="block">
							Job ID: 1159
						</Typography>
					</Box>
					<Typography component="p" variant="body2">
						<Box display="flex" alignItems="center">
							<AccessTimeIcon sx={{ p: 1 }} />
							Invite Candidate to Interview
						</Box>
					</Typography>
					<Typography component="p" variant="body2">
						<Box display="flex" alignItems="center">
							<CalendarTodayIcon sx={{ p: 1 }} />
								6/11/2024
							</Box>
					</Typography>
					<Box display="flex" justifyContent="center">
						<Button onClick={handleViewApplication}>
							View Application
						</Button>
					</Box>
				</Box>
			}
			<Box display="flex" justifyContent="flex-end">
				<Button>
					Submit To Requisition
				</Button>
			</Box>
		</Paper>
	);
}
