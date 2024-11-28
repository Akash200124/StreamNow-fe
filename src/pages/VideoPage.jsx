import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import logo from '../assets/logo.png'
import Comments from "../components/comments.jsx";
import conf from "../conf/config.js"

function VideoPage() {

    const location = useLocation();
    const video = location.state?.video;
    console.log("video", video);

    const [liked, setLiked] = useState(false); // Track whether the video is liked
    const [comments, setComments] = useState([]);

 
    const videoId = video?._id;

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const url = `${conf.baseUrl}/comment/get-video-comments`; // Adjust endpoint as needed
                const response = await axios.get(url, {
                    params: {
                        videoId: videoId
                    },
                    withCredentials: true // Ensures cookies are sent with the request
                });

                if (response.status === 200) {
                    console.log("Video details fetched successfully");
                    // Update the video state with the fetched data  
                    // console.log("comments", response);  
                    setComments(response?.data?.data);
                } else {
                    console.log("Error in fetching video details");
                }
            } catch (error) {
                console.error("Error while fetching video details:", error);
            }
        };

        fetchVideoDetails();
    }, [videoId]); // Add videoId as a dependency



    console.log("comments", comments);




    if (!video) {
        return <p>No video details found.</p>;
    }

    return (
        <div>
            <div className='pt-3 flex flex-row ml-3 '>
                <img src={logo} alt="" width={50} height={40} />
                <h2 className='pl-3 pt-1 text-3xl bold font-mono'>StreamNow</h2>
            </div>

            <Header />
            <video
                src={video.videoFile}
                controls
                className=" h-full w-[1000px] border rounded-xl mt-[30px] ml-5" />
            <h1 className='text-2xl font-bold  mt-1 ml-5'>{video.title}</h1>

            <div className="flex flex-row mt-3 ml-5 border w-[1000px] border-black rounded-md ">sdf</div>

            <div className='mt-3 ml-5 h-[80px] w-[1000px] p-2  bg-gray-400 bg-opacity-50 border border-black rounded-md'>
                {video.views} views
                <p className='text-sm'>{video.description}</p>
                {/* <p className='text-sm'>{video.createdAt}</p> */}
            </div>

            {/* comments section  */}
            <div className="p-2 mt-3 ml-5 w-[1000px]">
                200 comments
            </div>
            <div className='p-2 mt-3 ml-5 w-[1000px]'>
                <input
                    type="text"
                    name=""
                    id="comment"
                    placeholder='Add a comment'
                    className='w-[1000px] h-[40px] '
                />
                <div className="w-[1000px] h-[2px] bg-black"></div>

                {/* buttons  */}
                <div className="flex flex-row gap-1 mt-1 ml-[800px]   ">
                    <button
                        className="px-4 py-2 border border-black text-black font-medium rounded hover:bg-gray-100 active:bg-gray-200"
                        type="reset"

                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 active:bg-blue-700 ml-2"
                        type="submit"
                    >
                        Comment
                    </button>
                </div>

            </div>

            {/* old comments  */}
            <div className="ml-5 p-2 mt-3 w-[1000px]">

                {comments?.map((comment) => (
                    <Comments key={comment._id} comment={comment} />
                ))}
            </div>


        </div>
    );
}
export default VideoPage
