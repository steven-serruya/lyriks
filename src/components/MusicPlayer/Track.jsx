import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img         src={activeSong?.attributes?.artwork?.url} // Updated path for cover art
 alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
      {activeSong?.attributes?.name ? activeSong?.attributes?.name : 'No active Song'} {/* Updated path for title */}      </p>
      <p className="truncate text-gray-300">
      {activeSong?.attributes?.artistName ? activeSong?.attributes?.artistName : 'Unknown Artist'} {/* Path for artist name */}
      </p>
    </div>
  </div>
);

export default Track;
