import React from 'react'
import { Link } from 'react-router-dom'

function VideoCard( url, title) {
  return (
    <div className='flex flex-col'>
            <div className=''>
                <Link to="/video" >
                 <img src={url} alt="" srcset="" />
                </Link>
            </div>
            <div>

            </div>
    </div>
  )
}

export default VideoCard
