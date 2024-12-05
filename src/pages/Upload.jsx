import React, { useState } from 'react';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import axios from 'axios';
import conf from '../conf/config.js';

function Upload() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);
    const [response, setResponse] = useState(null);

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!title || !description || !thumbnail || !video) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('thumnail', thumbnail);
        formData.append('videoFile', video);

        try {
            const response = await axios.post(`${conf.baseUrl}/videos/upload-video`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            alert('Upload successful!');
            console.log(response.data);
            setResponse(response.data);

        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Upload failed!');
        }
    };

    const videoUrl = response?.data?.videoFile || '';
    const thumbnailUrl = response?.data?.thumnail || '';
    return (
        <>
            <div className="flex">
                <div className="">
                    <SideMenu />
                </div>
                <Header />
                <div className="ml-3 mt-[80px]">
                    <h1 className="font-bold text-2xl ">Create Video</h1>

                    <form onSubmit={handleUpload}>
                        <div className="flex flex-col mt-10">
                            <label>Video Title</label>
                            <input
                                className="border border-gray-500 p-2"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col mt-10">
                            <label>Video Thumbnail</label>
                            <input
                                className="border border-gray-500 p-2"
                                type="file"
                                onChange={(e) => setThumbnail(e.target.files[0])}
                            />
                        </div>

                        <div className="flex flex-col mt-10">
                            <label>Video Description</label>
                            <textarea
                                className="border border-gray-500 p-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col mt-10">
                            <label>Video</label>
                            <input
                                className="border border-gray-500 p-2"
                                type="file"
                                onChange={(e) => setVideo(e.target.files[0])}
                            />
                        </div>

                        <div className="flex flex-row mt-5">
                            <button
                                type="reset"
                                className="bg-red-600 text-white px-3 py-2 rounded-md"
                                onClick={() => {
                                    setTitle('');
                                    setDescription('');
                                    setThumbnail(null);
                                    setVideo(null);
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="bg-green-600 text-white px-3 py-2 rounded-md ml-3"
                            >
                                Upload
                            </button>
                        </div>
                    </form>

                    <div>
                        <video src={videoUrl}></video>
                        <img src={thumbnailUrl} alt="" srcset="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Upload;
