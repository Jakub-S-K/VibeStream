import './SongPlayer.css';
import { useSongPlayer } from '../context/SongPlayerContext';
import { useEffect } from 'react';
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlayButton,
  // MediaSeekBackwardButton,
  // MediaSeekForwardButton,
  MediaMuteButton,
  MediaTextDisplay,
} from 'media-chrome/react';

function SongPlayer() {
  const { currentTrack, audioRef, titleRef } = useSongPlayer();

  return (
    <MediaController>
      <audio ref={audioRef} slot='media' src={currentTrack}></audio>
      <MediaControlBar>
        <MediaPlayButton />
        <MediaVolumeRange />
        <MediaMuteButton />
        <MediaTimeRange />
        <MediaTimeDisplay showDuration />
        <MediaTextDisplay ref={titleRef} />
      </MediaControlBar>
    </MediaController>
  );
}

export default SongPlayer;
