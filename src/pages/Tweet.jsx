import React, { useEffect, useState } from 'react';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import axios, { all } from 'axios';
import conf from '../conf/config.js';

function Tweet() {
    const [tweet, setTweet] = useState('');
    const [allTweet, setAllTweet] = useState([]);

    const handleTweet = async () => {
        if (!tweet.trim()) { // Check if the input is empty or contains only whitespace
            alert('Tweet cannot be empty!');
            return;
        }

        try {
            const response = await axios(`${conf.baseUrl}/tweet/create-tweet`, {
                method: 'POST',
                withCredentials: true, // Ensures cookies are sent
                data: {
                    content: tweet,
                },
            });

            console.log('Tweet successfully created:', response.data);
            setTweet(''); // Clear the input field after successful submission
        } catch (error) {
            console.error('Failed to create tweet:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        const getAllTweets = async () => {
            try {
                const response = await axios(`${conf.baseUrl}/tweet/getAllUser-tweet`, {
                    method: 'GET',
                    withCredentials: true, // Ensures cookies are sent
                });
                console.log('All tweets:', response?.data?.data);
                setAllTweet(response?.data?.data);
            } catch (error) {
                console.error('Failed to get tweets:', error.response ? error.response.data : error.message);
            }
        };
        getAllTweets();
    }, [tweet]); // Depend on tweet state so it re-fetches when a new tweet is added

    return (
        <div className='flex'>
            <SideMenu />
            <div className='flex flex-col w-full'>
                {/* <Header /> */}
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
                            allTweet.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((tweetData) => (
                                <div key={tweetData._id} className="mb-4 p-4 border border-gray-300 rounded">
                                    <div className="font-semibold">{tweetData.user?.name}</div>
                                    <p className="text-gray-800">{tweetData.content}</p>
                                    <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                                        <span>{new Date(tweetData.createdAt).toLocaleString()}</span>
                                        <span>User : {tweetData.owner}</span>
                                        {/* Example for interaction: likes */}
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
    );
}

export default Tweet;
