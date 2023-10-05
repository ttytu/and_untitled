import React, { useState, useRef, useEffect } from 'react';
import './VideoGrid.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const VideoGrid = () => {
	const [videoUrls, setVideoUrls] = useState([
		'/videos/MAH05692.MP4', '/videos/MAH05693.MP4', '/videos/MAH05694.MP4',
		'/videos/MAH05695.MP4', '/videos/MAH05696.MP4', '/videos/MAH05697.MP4',
		'/videos/MAH05698.MP4', '/videos/MAH05699.MP4', '/videos/MAH05700.MP4'
	]);

	const [playing, setPlaying] = useState(new Array(videoUrls.length).fill(false));
	const videoRefs = useRef(new Array(videoUrls.length).fill(null));
	const [muted, setMuted] = useState(false);

	const handlePlayPause = (index) => {
		const newPlaying = [...playing];
		newPlaying[index] = !newPlaying[index];
		setPlaying(newPlaying);
		if (newPlaying[index]) {
			videoRefs.current[index].play();
		} else {
			videoRefs.current[index].pause();
		}
	};

	const handleMuteUnmute = () => {
		const newMuted = !muted;
		setMuted(newMuted);
		videoRefs.current.forEach((video) => {
			video.volume = newMuted ? 0 : 1;
		});
	};

	const handleFullScreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
	};

	const handleShuffle = () => {
		const shuffledUrls = videoUrls.sort(() => Math.random() - 0.5);
		const shuffledPlaying = new Array(shuffledUrls.length).fill(false);
		const shuffledRefs = new Array(shuffledUrls.length).fill(null);
		videoRefs.current.forEach((video, index) => {
			shuffledRefs[index] = video;
			shuffledPlaying[index] = playing[index];
		});
		setPlaying(shuffledPlaying);
		videoRefs.current = shuffledRefs;
		setVideoUrls(shuffledUrls);
	};

	const handleRefresh = () => {
		window.location.reload();
	};

	useEffect(() => {
		handleShuffle();
	}, []);

	return (
		<>
			<div className="row row-cols-3 grid-container g-1">
				{videoUrls.map((url, index) => (
					<div key={index} className="col video-container position-relative">
						<video ref={el => videoRefs.current[index] = el} src={url} loop className="w-100 h-100 object-fit-fill" />
						<button onClick={() => handlePlayPause(index)} className="play-pause">
							{playing[index] ? <i className="bi bi-pause"></i> : <i className="bi bi-play"></i>}
						</button>
					</div>
				))}
			</div>
			<div className="position-absolute controls">
					<a className="btn btn-dark" onClick={handleMuteUnmute}>{muted ? <i className="bi bi-volume-up"></i> : <i className="bi bi-volume-mute"></i>}</a>
					<a className="btn btn-dark" onClick={handleFullScreen}><i className="bi bi-fullscreen"></i></a>
					<a className="btn btn-dark" onClick={handleRefresh}><i className="bi bi-shuffle"></i></a>
				</div>
		</>
	);
};

export default VideoGrid;
