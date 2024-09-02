import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery, useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid);
  const { data, isFetching: isFetchinRelatedSongs, error } = useGetSongRelatedQuery(songid);
 
  
  // const artists = songData?.resources?.artists;
  // const artistId = artists ? Object.keys(artists)[0] : undefined;
  const { data: artistData, isFetching: isFetchingArtistData } = useGetArtistDetailsQuery(artistId);
  console.log('artistId', artistId);
  console.log('sondId:', songid);
  console.log('sondData:', songData);
  console.log('artistData:', artistData);
  console.log('data:', data);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };


  return (
     <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        songData={songData}
        artistData={artistData}
      />
{/* 
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {type === 'lyrics'
            ? text.map((line, i) => (
              <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
            ))
            : (
              <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
            )}
        </div>
      </div> */}

      <RelatedSongs
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />

    </div>
  );
};

export default SongDetails;