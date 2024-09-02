import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SearchCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // Define primary and fallback image URLs
  const primaryImageUrl = song?.attributes?.artwork?.url;
  const fallbackImageUrl =  song?.images?.coverart; // Replace this with your desired fallback URL

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.id === song.id ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
        
        </div>
        <img 
          alt="song_img" 
          src={fallbackImageUrl} // Use primary image URL or fallback if the primary doesn't exist
          className="w-full h-full rounded-lg" 
        />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>
            {song?.title}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={`/artists/${song?.artists?.[0]?.adamid}`}>
            {song?.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SearchCard;
