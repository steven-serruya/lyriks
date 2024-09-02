/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);
  // Handle play/pause based on isPlaying prop
  useEffect(() => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  }, [isPlaying]);

  // Update volume based on volume prop
  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  // Update current time based on seekTime prop
  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  // Extract preview URL from the song's attributes and fallback URL from actions
  const previewUrl = activeSong?.attributes?.previews[0]?.url;
  const fallbackUrl = activeSong?.hub?.actions?.actions?.uri;

  return (
    <audio
      src={previewUrl || fallbackUrl} // Use preview URL or fallback URL for audio playback
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
