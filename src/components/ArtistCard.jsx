import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();
console.log('track', track)
const artistId = track.relationships?.artists?.data?.[0]?.id;

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${artistId}`)}
    >
      <img alt="song_img" src={track?.attributes?.artwork?.url} className="w-full h-56 rounded-lg" />
      <p className="mt-4 font-semibold text-lg text-white truncate">
      {track?.attributes?.artistName}
      </p>
    </div>
  );
};

export default ArtistCard;