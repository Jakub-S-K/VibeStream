import './SongPlayer.css';
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaTextDisplay,
} from 'media-chrome/react';

function SongPlayer({ src, ref1, ref2 }) {

  return (
<MediaController>
  <audio ref={ref1}
    slot="media"
    src={src}
  ></audio>
  <MediaControlBar>
    <MediaPlayButton></MediaPlayButton>
    <MediaTimeDisplay showDuration></MediaTimeDisplay>
    <MediaMuteButton></MediaMuteButton>
    <MediaVolumeRange></MediaVolumeRange>
    <MediaTimeRange></MediaTimeRange>
	<MediaTextDisplay ref={ref2}></MediaTextDisplay>
  </MediaControlBar>
</MediaController>
  );
}

export default SongPlayer;
