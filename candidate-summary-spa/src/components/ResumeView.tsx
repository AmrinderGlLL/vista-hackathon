import { Box, Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function getResume(personId: string) {
	if(personId === '1') {
		return '/BrianFarley.jpg';
	}
	if(personId === '2') {
		return '/TravisOast.jpg';
	}
	if(personId === '3') {
		return '/KarenJones.jpg';
	}
	return '/resume.webp'
}

export default function ResumeView({}) {
	const [loading, setLoading] = useState<boolean>(true);
	const { candidateId } = useParams();

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Box overflow='scroll' height='100%'>
			{loading ? <Skeleton variant='rectangular' height='1200px' /> : <img src={getResume(candidateId)} alt="resume" width={'100%'}/> }
		</Box>
	)
}
