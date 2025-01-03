import React from "react";
import { popartists, popalbums, popradio } from '../backend/service/app.service.ts';
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet-async";

const App: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-black text-white">
            {/* Helmet */}
            <Helmet>
                <title>Spotify Web: Music for Everyone</title>
            </Helmet>

            {/* Header */}
            <header className="bg-black absolute top-0 w-full z-10">
                <div className="flex items-center justify-center p-4">
                    {/* Logo */}
                    <div className="w-1/3 justify-start">
                        <img src="/sp-white.svg" alt="Spotify Logo" className="h-8"/>
                    </div>

                    {/* Search Bar with Buttons */}
                    <div className="flex items-center justify-center w-1/3 gap-2">
                        {/* Button Before Search Bar */}
                        <button className="btn btn-circle bg-transparent border-0 h-10 w-10">
                            <img src="/home.svg" alt="Home" className="h-10 w-10"/>
                        </button>

                        {/* Search Bar */}
                        <input
                            type="text"
                            placeholder="What do you want to play?"
                            className="input w-full max-w-[1000px] text-white rounded-full bg-[#121212]"
                        />
                    </div>

                    <div className="flex items-center space-x-4 w-1/3 justify-end">
                        <button
                            className="btn btn-ghost rounded-full"
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </button>
                        <button
                            className="btn btn-white rounded-full bg-white text-black border-white hover:bg-gray-200 hover:border-gray-200"
                            onClick={() => navigate('/login')}
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </header>

             {/* Sidebar */}
            <aside className={`flex flex-col rounded-2xl mt-20 mb-24 overflow-y-auto w-[20%] bg-[#121212] p-4 space-y-4 ml-0 mr-2`}>

                {/* Your library */}
                <div className="flex items-center space-x-2 mb-4">
                    <button
                        className="flex items-center space-x-2 bg-transparent hover:text-white text-[#e7e9ecbf] transition-all group">
                        <img
                            src="/yourlibrary.svg"
                            alt="Your Library Icon"
                            className="h-10 w-10 pl-1 opacity-100 transition-opacity duration-300 group-hover:opacity-100"
                        />
                        <h2 className="font-semibold text-lg">Your Library</h2>
                    </button>
                </div>

                {/* Create Playlist Card */}
                <div className="bg-[#181818] p-4 rounded-lg flex flex-col items-start space-y-2">
                    <h3 className="font-bold">Create your first playlist</h3>
                    <p className="text-sm text-gray-400">It's easy, we’ll help you</p>
                    <button
                        className="btn btn-white rounded-full min-h-1 h-6 py-1 text-black font-bold bg-white hover:bg-gray-200 !mt-6">
                        Create playlist
                    </button>
                </div>

                {/* Browse Podcasts Card */}
                <div className="bg-[#181818] p-4 rounded-lg flex flex-col items-start space-y-2">
                    <h3 className="font-bold">Let’s find some podcasts to follow</h3>
                    <p className="text-sm text-gray-400">We’ll keep you updated on new episodes</p>
                    <button
                        className="btn btn-white rounded-full min-h-1 h-6 py-1 text-black font-bold bg-white hover:bg-gray-200 !mt-6">
                        Browse podcasts
                    </button>
                </div>

                {/* Legal footer and language */}
                <div className="absolute bottom-28 bg-transparent text-[#e7e9ec] pl-1 p-6 max-w-[20%]">
                    <div className="flex flex-row flex-wrap justify-start text-[10px] mb-6 p-1 gap-2">
                        <a href="#" className="hover:underline">Legal</a>
                        <a href="#" className="hover:underline">Safety & Privacy Center</a>
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Cookies</a>
                        <a href="#" className="hover:underline">About Ads</a>
                        <a href="#" className="hover:underline">Accessibility</a>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            className="flex items-center space-x-2 bg-[#181818] text-white font-bold py-2 px-4 rounded-full border border-gray-600 hover:bg-gray-800">
                            <img src="/globe.svg" alt="Language" className="h-5 w-5"/>
                            <span>English</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto mt-20 mb-24 rounded-2xl bg-[#121212]">

                {/* Popular Artists */}
                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-4">Popular artists</h2>
                    <div className="grid grid-cols-5 gap-4">
                        {popartists.map((artist) => (
                            <div
                                key={artist.id}
                                className="!p-0 card max-w-max relative group"
                            >
                                <div className="relative">
                                    <img
                                        src={artist.pic}
                                        alt={artist.name}
                                        className="mb-2 h-56 w-56 rounded-full"
                                    />
                                    {/* Play Icon with Animation */}
                                    <img
                                        src="/play-green.svg"
                                        alt="Play"
                                        className="absolute bottom-2 right-2 w-12 h-12 opacity-0 translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0"
                                    />
                                </div>
                                <h3>{artist.name}</h3>
                                <p className="text-gray-400 text-sm">Artist</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Popular Albums */}
                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-4">Popular albums and singles</h2>
                    <div className="grid grid-cols-5 gap-4">
                        {popalbums.map((album) => (
                            <div
                                key={album.id}
                                className="!p-0 card max-w-max relative group"
                            >
                                <div className="relative">
                                    <img
                                        src={album.cover}
                                        alt={album.name}
                                        className="mb-2 h-56 w-56 rounded-lg"
                                    />
                                    {/* Play Icon with Animation */}
                                    <img
                                        src="/play-green.svg"
                                        alt="Play"
                                        className="absolute bottom-4 right-4 w-12 h-12 opacity-0 translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0"
                                    />
                                </div>
                                <h3>{album.name}</h3>
                                <p className="text-gray-400 text-sm">{album.artist}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Popular Radio */}
                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-4">Popular radio</h2>
                    <div className="grid grid-cols-5 gap-4">
                        {popradio.map((radio) => (
                            <div
                                key={radio.id}
                                className="!p-0 card max-w-max relative group"
                            >
                                <div className="relative">
                                    <img
                                        src={radio.cover}
                                        alt={radio.title}
                                        className="mb-2 h-56 w-56 rounded-lg"
                                    />
                                    {/* Play Icon with Animation */}
                                    <img
                                        src="/play-green.svg"
                                        alt="Play"
                                        className="absolute bottom-4 right-6 w-12 h-12 opacity-0 translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0"
                                    />
                                </div>
                                <p className="text-gray-400 text-sm">{radio.title}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 w-screen bg-gradient-to-r from-purple-600 to-blue-500 text-white py-6">
                <div className="container mx-auto flex items-center justify-between">
                    {/* Text */}
                    <div>
                        <h2 className="font-bold">Preview of Spotify</h2>
                        <p className="text-sm">
                            Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        className="btn btn-white rounded-full min-h-2 h-10 bg-white text-black border-white hover:bg-gray-200 hover:border-gray-200 text-[1rem] w-44"
                        onClick={() => navigate('/signup')}>
                        Sign up for free
                    </button>
                </div>
            </footer>

        </div>
    );
};

export default App;
