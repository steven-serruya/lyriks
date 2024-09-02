import React from 'react';
import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const trackId = songData?.data?.[0]?.id;
  const artworkUrl = songData?.resources?.["shazam-songs"]?.[trackId]?.attributes?.artwork?.url;
  const title = songData?.resources?.["shazam-songs"]?.[trackId]?.attributes?.title;
  const artistName = songData?.resources?.["shazam-songs"]?.[trackId]?.attributes?.artist;
  const genre = songData?.resources?.["shazam-songs"]?.[trackId]?.attributes?.genres?.primary;
  // const artistBio = artistData?.data[0]?.attributes?.artistBio;


  return (
    <div className="relative w-full flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

    <div className="absolute inset-0 flex items-center">
      <img
        alt="profile"
        src={
          artistId ? artistData?.data[0].attributes?.artwork?.url
            .replace('{w}', '500')
            .replace('{h}', '500')
            : artworkUrl 
}
        className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
      />

      <div className="ml-5">
        <p className="font-bold sm:text-3xl text-xl text-white">
          {artistId ? artistData?.data[0].attributes?.name : title}
        </p>
        {!artistId && (
          <Link to={`/artists/${artistData?.id}`}>
            <p className="text-base text-gray-400 mt-2">{artistName}</p>
          </Link>
        )}

        <p className="text-base text-gray-400 mt-2">
          {artistId
            ? artistData?.data?.[0].attributes.genreNames
            : genre}
        </p>
        
      </div>
      
    </div>

    <div className="w-full sm:h-44 h-24" />
  </div>
  );
};



export default DetailsHeader;
