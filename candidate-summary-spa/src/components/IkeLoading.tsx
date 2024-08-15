import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { PlayArrow as PlayArrowIcon, Pause as PauseIcon } from '@mui/icons-material';
import { useLocalstorageState } from 'rooks';

import LoadingStateVideo from '../icons/loadingstatesparklecropped.mp4';

interface LoadingProps {
	loadingText: string;
}

export default function Loading({ loadingText }: LoadingProps) {
  const [videoPaused, setVideoPaused] = useLocalstorageState('job-copilot-dc:animation-pause', false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handlePausePlay = async () => {
    if (videoRef.current) {
      if (videoPaused) {
        await videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }

    setVideoPaused((state) => {
      return !state;
    });
  };

  const autoPlayAttribute = videoPaused ? {} : { 'autoPlay': true };

  return (
    <Box width="100%" pl={3} pr={3} pb={2} boxSizing="border-box" display="flex" alignItems="center" flexDirection="column">
			<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
				<video id="ike-video" ref={videoRef} width="80px" height="80px" {...autoPlayAttribute} loop muted playsInline aria-hidden src={LoadingStateVideo} />
        <Typography variant="h2" sx={{ ml: 2 }}>
					{loadingText}
				</Typography>
			</Box>
			<Button
					autoFocus
					sx={{ mt: 2 }}
					aria-controls="ike-video"
					variant="outlined"
					color="primary"
					focusRipple={false}
					startIcon={videoPaused ? <PlayArrowIcon /> : <PauseIcon />}
					onClick={handlePausePlay}
				>
					{videoPaused ? 'Play Animation' : 'Pause Animation'}
				</Button>
    </Box>
  );
}
