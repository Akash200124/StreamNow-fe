import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function VideoCard({ video }) {

  const formatDuration = (duration) => {
    const totalSeconds = Math.floor(duration * 60); // Convert decimal minutes to total seconds
    const minutes = Math.floor(totalSeconds / 60); // Extract minutes
    const seconds = totalSeconds % 60; // Extract remaining seconds
    return `${minutes}:${seconds.toString().padStart(2, "0")}`; // Format as mm:ss
  };

  // console.log("video", video);
  return (
    <div className='relative flex flex-col cursor-pointer'>
      <div className='' >
        <Link
          to="/video"
          state={{ video }}
        >

          <img
            src={video.thumnail}
            alt={video.title}
            className="w-[400px] h-[250px] border border-black rounded-lg" />

          <div className='text-sm w-[38px] h-[24px] px-1 bg-black font-bold border border-black rounded-2xl text-white ml-[360px] absolute flex items-center bg-opacity-50 py-1  mt-[-30px] '>{formatDuration(video.duration)} </div>
        </Link>

      </div>
      <div>
        <p>{video.title}</p>
        <p className='text-sm text-gray-700'>{video.description}</p>

      </div>
    </div>
  )
}

export default VideoCard
