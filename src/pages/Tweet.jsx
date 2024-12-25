import React, { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import conf from "../conf/config.js";
import { io } from "socket.io-client";

function Tweet() {
    const [tweet, setTweet] = useState("");
    const [allTweet, setAllTweet] = useState([]);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    // Initialize Socket.io
    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to server:", newSocket.id);
        });

        newSocket.on("receive_message", (data) => {
            console.log("Message received:", data);
            setAllTweet((prevTweets) => [data, ...prevTweets]);
        });

        newSocket.on("error", (err) => {
            console.error("Socket error:", err);
        });

        return () => {
            newSocket.disconnect(); // Clean up socket connection
        };
    }, []);

    // Handle Tweet Submission
    const handleTweet = async () => {
        if (!tweet.trim()) {
            toast.error("Tweet cannot be empty!");
            return;
        }

        try {
            const response = await axios(`${conf.baseUrl}/tweet/create-tweet`, {
                method: "POST",
                withCredentials: true,
                data: { content: tweet },
            });

            console.log("Tweet successfully created:", response.data);

            if (socket) {
                socket.emit("send_message", response.data);
            }
            setTweet("");
        } catch (error) {
            console.error("Failed to create tweet:", error.response?.data || error.message);
            toast.error("Failed to create tweet.");
        }
    };

    // Fetch All Tweets on Mount
    useEffect(() => {
        const getAllTweets = async () => {
            try {
                const response = await axios(`${conf.baseUrl}/tweet/getAllUser-tweet`, {
                    method: "GET",
                    withCredentials: true,
                });
                setAllTweet(response?.data?.data || []);
            } catch (error) {
                console.error("Failed to get tweets:", error.response?.data || error.message);
                toast.error("Failed to load tweets.");
            }
        };

        getAllTweets();
    }, [tweet]);

    return (
        <>
            <div className="flex">
                <SideMenu />
                <div className="flex flex-col w-full">
                    <div className="overflow-hidden w-full p-4">
                        <div className="flex justify-between items-center mb-4">
                            <input
                                type="text"
                                value={tweet}
                                onChange={(e) => setTweet(e.target.value)}
                                placeholder="Enter your tweet"
                                className="p-2 border border-gray-300 rounded w-[80%]"
                            />
                            <button
                                type="button"
                                onClick={handleTweet}
                                className="ml-4 bg-sky-500 hover:bg-sky-700 text-white p-2 rounded"
                            >
                                Tweet
                            </button>
                        </div>

                        <div className="mt-4">
                            {allTweet.length > 0 ? (
                                allTweet
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .map((tweetData) => (
                                        <div
                                            key={tweetData._id}
                                            className="mb-4 p-4 border border-gray-300 rounded"
                                        >
                                            <div className="font-semibold">{tweetData.user?.name}</div>
                                            <p className="text-gray-800">{tweetData.content}</p>
                                            <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                                                <span>{new Date(tweetData.createdAt).toLocaleString()}</span>
                                                <span>User: {tweetData.owner}</span>
                                                <span>Likes: {tweetData.likes?.length || 0}</span>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <p>No tweets available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default Tweet;
