import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader } from '../components';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

// Function to strip HTML tags
const stripHtmlTags = (text) => {
  return text.replace(/<\/?[^>]+>/gi, '');
};

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
  const artistOrigin = artistData?.data?.[0]?.attributes?.origin;
  const artistBio = artistData?.data?.[0]?.attributes?.artistBio;
  const artistBornOrFormed = artistData?.data?.[0]?.attributes?.bornOrFormed;
  const artistUrl = artistData?.data?.[0]?.attributes?.url;

  console.log('artistData', artistData);
  const topVideos = artistData?.data?.[0]?.views?.['top-music-videos']?.data || [];
  console.log('topVideos', topVideos);

  if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData}
      />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">About the Artist:</h2>
        <div className="mt-5">
          {artistId && (artistOrigin || artistBornOrFormed) && (
            <p className="text-gray-300 text-base my-6" style={{ lineHeight: '3.5' }}>
              {artistOrigin && <strong>Origin:</strong>} {artistOrigin && `${artistOrigin}`}<br/>
              {artistBornOrFormed && <strong>{artistBornOrFormed.includes("Formed") ? "Formed on:" : "Born on:"}</strong>} {artistBornOrFormed}
            </p>
          )}
          {artistId && artistBio ? (
            <p className="text-gray-300 text-base my-6" style={{ lineHeight: '2.1' }}>
              {stripHtmlTags(artistBio)}
            </p>
          ) : (
            <p className="text-gray-300 text-base my-6" style={{ lineHeight: '2' }}>
              Sorry, No bio found!
            </p>
          )}
          {artistUrl && (
            <a href={artistUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-500 text-base my-6 underline">
              More info about {artistData?.data?.[0]?.attributes?.name}
            </a>
          )}
        </div>
      </div>

      {/* 
      <RelatedSongs
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      /> */}
    </div>
  );
};

export default ArtistDetails;
