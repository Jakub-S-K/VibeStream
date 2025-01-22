import React, { createContext, useState, useContext, useRef } from 'react';

export const SongPlayerContext = createContext();

export const SongPlayerProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const titleRef = useRef(null);

  const nextTrack = () => {
    if (playlist.length === 0) return;

    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    const nextTrack = playlist[nextIndex];
    playTrack(
      nextIndex,
      `http://localhost:3001/api/stream/${nextTrack.id}`,
      nextTrack.title
    );
  };

  const playTrack = (index, src, title) => {
    if (audioRef.current) {
      titleRef.current.innerHTML = title;
      audioRef.current.src = src;
      audioRef.current.play();
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const clearPlaylist = () => {
    setPlaylist(null);
  };

  if (audioRef.current) {
    audioRef.current.onended = nextTrack;
  }

  return (
    <SongPlayerContext.Provider
      value={{
        setPlaylist,
        currentTrack,
        currentTrackIndex,
        isPlaying,
        playTrack,
        pauseTrack,
        togglePlayPause,
        audioRef,
        titleRef,
      }}
    >
      {children}
    </SongPlayerContext.Provider>
  );
};

export const useSongPlayer = () => useContext(SongPlayerContext);
