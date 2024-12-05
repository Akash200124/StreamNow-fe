import React, { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import axios from "axios";
import conf from "../conf/config.js";
import { useSelector } from "react-redux";

function Landingpage() {

    const authStatus = useSelector((state) => state.auth.status);
    const [listVideo, setListVideo] = useState([]);

    // console.log("listVideo", listVideo);
   
    useEffect(() => {
        const videos = async () => {
            try {
                const url = conf.baseUrl
                // console.log("url:", url);
                const videos = await axios.get(`${url}/videos/get-allvideos?page=1&limit=10`, {
                    withCredentials: true
                });
                // console.log("videos", videos?.data?.data[0]); 
                setListVideo((videos.data?.data || []))
                
                return videos;
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        videos();
    }, []);


    return (
        <>
              <div className=" flex">
                <div className="">
                    <SideMenu />
                </div>
                <Header />
                <div className="ml-3 mt-[80px]">


                    <div className="flex flex-wrap gap-2">
                        {listVideo.length > 0 ? (
                            listVideo.map((video, index) => (
                                <VideoCard
                                    key={index}
                                    video={video}
                                />
                            ))
                        ) : (
                            <p>Loading videos...</p>
                        )}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Landingpage