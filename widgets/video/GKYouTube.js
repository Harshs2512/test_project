import React, { Fragment, useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const GKYouTube = (props) => {
	const { videoId, height } = props;
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}
	const extractVimeoVideoUrl = () => {
		const match = videoId.match(/src=["'](https:\/\/player\.vimeo\.com\/video\/[^?]+)\?/);
		return match ? match[1] : null;
	};
	const vimeoVideoUrl = extractVimeoVideoUrl();
	const isYouTubeVideo = vimeoVideoUrl ? false : true;
	const renderVideo = () => {
		if (isYouTubeVideo) {
			const youtubeMatch = videoId.match(/v=([^&]+)/);
			if (youtubeMatch && youtubeMatch[1]) {
				const youtubeVideoId = youtubeMatch[1];
				const opts = {
					width: '100%',
					height,
					playerVars: {
						autoplay: 0,
					},
				};
				return <YouTube videoId={youtubeVideoId} opts={opts} />;
			} else {
				return <div>No valid YouTube video ID found</div>;
			}
		} else if (vimeoVideoUrl) {
			return (
				<div
					style={{
						padding: '56.25% 0 0 0',
						position: 'relative',
					}}
				>
					<iframe
						src={vimeoVideoUrl}
						frameBorder="0"
						allow="autoplay; fullscreen; picture-in-picture"
						style={{
							position: 'absolute',
							top: '0',
							left: '0',
							width: '100%',
							height: '100%',
						}}
						title="Vimeo Video"
					></iframe>
				</div>
			);
		} else {
			return <div>No video available</div>;
		}
	};


	return <Fragment>{renderVideo()}</Fragment>;
};

export default GKYouTube;
