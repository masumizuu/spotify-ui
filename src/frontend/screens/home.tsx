import React, {useState, useRef, useEffect} from "react";
import { playlists, songs, placeholders, artists } from '../../backend/service/home.service.ts';
import {Song} from "../../backend/models/Song.ts";
import {Playlist} from "../../backend/models/Playlist.ts";
import {Helmet} from "react-helmet-async";


const Home: React.FC = () => {
// DISPLAY CONTROLS //

    // left side display toggle
    const [showPlaylists, setShowPlaylists] = useState(true); // default
    const [showAlbums, setShowAlbums] = useState(false);
    const albums = Array.from(
        new Set(songs.map((song: Song) => song.album as string)) // Ensure album is treated as a string
    ).map((album: string) => ({
        name: album,
        cover: songs.find((song: Song) => song.album === album)?.cover as string || "/default.jpg", // Match album and ensure cover is string
    }));

    // toggle left side
    const [isExpanded, setIsExpanded] = useState(true); // default
    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    // toggle now playing
    const [isNowPlayingVisible, setIsNowPlayingVisible] = useState(true); // off by default
    const toggleNowPlaying = () => {
        setIsNowPlayingVisible(!isNowPlayingVisible);
    };

    // green play button
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const handlePlaylistClick = (id: number) => {
        setShowPlaylist(true);
        setShowHome(false);
        setBgColor(playlists[id - 1].bgColor!);
        setCurrentPlaylist(playlists[id-1]);
    };

    // home view or playlist view
    const [showHome, setShowHome] = useState(true); // default
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [bgColor, setBgColor] = useState("#fff");
    const handleHome = () => {
        setShowHome(true);
        setShowPlaylist(false);
    }

    //get next song
    const getNextInQueue = () => {
        const currentIndex = currentPlaylist?.songs.findIndex(song => song.id === currentSong!.id);
        const nextIndex = currentIndex! + 1;

        if (isRepeat) {
            // Repeat mode: Display the current song again
            return (
                <div className="flex items-center gap-4">
                    <img
                        src={currentSong!.cover}
                        alt={currentSong!.title}
                        className="w-16 h-16 rounded"
                    />
                    <div>
                        <p className="font-bold">{currentSong!.title}</p>
                        <p className="text-sm text-gray-400">{currentSong!.artist}</p>
                    </div>
                </div>
            );
        } else if (isShuffle) {
            // Shuffle mode: Display a random song
            const randomIndex = Math.floor(Math.random() * (currentPlaylist?.songs?.length ?? 0));
            const randomSong = currentPlaylist?.songs[randomIndex];
            return (
                <div className="flex items-center gap-4">
                    <img
                        src={randomSong?.cover}
                        alt={randomSong?.title}
                        className="w-16 h-16 rounded"
                    />
                    <div>
                        <p className="font-bold">{randomSong?.title}</p>
                        <p className="text-sm text-gray-400">{randomSong?.artist}</p>
                    </div>
                </div>
            );
        } else if (isLoop && currentIndex === (currentPlaylist?.songs?.length ?? 0) - 1) {
            // Loop mode: Point the last song's next to the start of the array
            const firstSong = currentPlaylist?.songs[0];
            return (
                <div className="flex items-center gap-4">
                    <img
                        src={firstSong?.cover}
                        alt={firstSong?.title}
                        className="w-16 h-16 rounded"
                    />
                    <div>
                        <p className="font-bold">{firstSong?.title}</p>
                        <p className="text-sm text-gray-400">{firstSong?.artist}</p>
                    </div>
                </div>
            );
        } else if (nextIndex < (currentPlaylist?.songs?.length ?? 0)) {
            // Default case: Display the next song
            const nextSong = currentPlaylist?.songs[nextIndex];
            return (
                <div className="flex items-center gap-4">
                    <img
                        src={nextSong?.cover}
                        alt={nextSong?.title}
                        className="w-16 h-16 rounded"
                    />
                    <div>
                        <p className="font-bold">{nextSong?.title}</p>
                        <p className="text-sm text-gray-400">{nextSong?.artist}</p>
                    </div>
                </div>
            );
        } else {
            // No more songs
            return <p className="text-sm text-gray-400">No more songs in the queue.</p>;
        }
    }

    // profile toggle
    const [isProfile, setIsProfile] = useState(false);
    const toggleProfile = () => {
        setIsProfile((prevIsProfile) => {
            const newIsProfile = !prevIsProfile;
            setShowHome(!newIsProfile); // Show home only if newIsProfile is false
            setShowPlaylist(false); // this is false if one of those are true
            return newIsProfile;
        });
    };
    useEffect(() => {
        if (showHome || showPlaylist) {
            setIsProfile(false);
        }
    }, [showHome, showPlaylist]); // to ensure no overlapping conditional displays

//  MUSIC CONTROLS //

    // current variables for dynamic display
    const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>();
    const [currentSong, setCurrentSong] = useState<Song | null>(songs[0]); //default pag wala pa pinaplay

    // current song's time (current & max)
    const [currentTime, setCurrentTime] = useState(0);
    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    };
    const [duration, setDuration] = useState(0);

    // popup for no more tracks next or previous
    const [showPopup, setShowPopup] = useState(false);

    // functions and variables for music controls
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoop, setIsLoop] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const handlePlayPlaylist = () => {
        if (currentPlaylist?.songs?.length) {
            const firstSong = currentPlaylist.songs[0];
            setCurrentSong(firstSong); // Set the first song as the current song

            if (audioRef.current) {
                audioRef.current.src = firstSong.file; // Set the audio source
                audioRef.current.load(); // Explicitly load the audio source

                // Wait for the audio to load before playing
                audioRef.current.onloadeddata = () => {
                    audioRef.current?.play().catch((err) => {
                        console.error("Audio playback failed:", err);
                    });
                    setIsPlaying(true);
                };
            }
            console.log("Playing:", firstSong);
        } else {
            console.error("No songs available in the current playlist");
        }
    };
    const playSong = (id: number) => {
        if (id !== null) {
            setCurrentSong(songs[id]);

            if (audioRef.current) {
                audioRef.current.src = currentSong!.file; // Set the audio source
                audioRef.current.load(); // Explicitly load the audio source

                // Wait for the audio to load before playing
                audioRef.current.onloadeddata = () => {
                    audioRef.current?.play().catch((err) => {
                        console.error("Audio playback failed:", err);
                    });
                    setIsPlaying(true);
                };
            }
            console.log("Playing:", currentSong);
        } else {
            console.error("Song file not found.");
        }
    };
    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current
                    .play()
                    .then(() => {
                        setIsPlaying(true); // Playback started successfully
                    })
                    .catch((error) => {
                        console.error("Playback failed:", error); // Handle playback errors
                    });
            }
        }
    };
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = parseFloat(e.target.value);
            setCurrentTime(audioRef.current.currentTime);
        }
    };
    const playNext = () => {
        if (currentSong && currentPlaylist?.len) {
            const currentIndex = currentPlaylist.findIndex((song: Song) => song.id === currentSong.id);

            if (isShuffle) {
                // Shuffle logic: Play a random song
                const randomIndex = Math.floor(Math.random() * currentPlaylist.songs.length);
                setCurrentSong(currentPlaylist.songs[randomIndex]);
            } else if (isRepeat) {
                // Repeat the current song
                audioRef.current!.currentTime = 0;
                if (audioRef.current) {
                    audioRef.current
                        .play()
                        .then(() => {
                            console.log("Playback started successfully.");
                        })
                        .catch((error) => {
                            console.error("Playback failed:", error);
                        });
                }
            } else if (isLoop && currentIndex === currentPlaylist.songs.length - 1) {
                // If loop is on and at the end, play the first song
                setCurrentSong(currentPlaylist.songs[0]);
            } else {
                // Default logic: Play the next song or show popup
                const nextIndex = currentIndex + 1;

                if (nextIndex < currentPlaylist.songs.length) {
                    setCurrentSong(currentPlaylist.songs[nextIndex]);
                } else {
                    // Show the popup if there are no more tracks
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 3000); // Hide popup after 3 seconds
                }
            }
        }
    };
    const playPrevious = () => {
        if (currentSong && currentPlaylist?.len) {
            const currentIndex = currentPlaylist.findIndex((song: Song) => song.id === currentSong.id);

            if (isShuffle) {
                // Play a random song
                const randomIndex = Math.floor(Math.random() * currentPlaylist.songs.length);
                setCurrentSong(currentPlaylist.songs[randomIndex]);
            } else if (isRepeat) {
                // Restart the audio
                audioRef.current!.currentTime = 0;
                if (audioRef.current) {
                    audioRef.current
                        .play()
                        .then(() => {
                            console.log("Playback started successfully.");
                        })
                        .catch((error) => {
                            console.error("Playback failed:", error);
                        });
                }
            } else if (isLoop && currentIndex === 0) {
                // If loop is on and at the start, play the last song
                setCurrentSong(currentPlaylist.songs[currentPlaylist.songs.length - 1]);
            } else {
                // Default logic: Play the previous song or show popup
                const previousIndex = currentIndex > 0 ? currentIndex - 1 : -1;

                if (previousIndex >= 0) {
                    setCurrentSong(currentPlaylist.songs[previousIndex]);
                } else {
                    // Show the popup if there are no more tracks
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 3000); // Hide popup after 3 seconds
                }
            }
        }
    };

    // volume controls
    const [volume, setVolume] = useState(100); // default volume
    const [previousVolume, setPreviousVolume] = useState(100); // For restoring volume
    const handleVolumeChange = (newVolume: number) => {
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100; // Set the volume (0 to 1)
        }
        setVolume(newVolume);
    };

// NOW PLAYING CONTROLS //
    const spanRef = useRef<HTMLSpanElement>(null);
    const [animationConfig, setAnimationConfig] = useState({ isOverflowing: true, overflowPercent: 3 });
    useEffect(() => {
        const checkOverflow = () => {
            if (spanRef.current) {
                // const containerWidth = spanRef.current.parentElement?.offsetWidth || 0;
                // const contentWidth = spanRef.current.scrollWidth;

                const effectiveSong = currentSong ?? songs[0];
                const title = effectiveSong?.title ?? "";
                const titleLength = title.length;

                let overflowPercent = 0;

                // Check if the title length exceeds 32 characters
                if (titleLength > 32) {
                    const extraChars = (titleLength - 32)+3; // Characters beyond 32
                    overflowPercent = (extraChars / titleLength) * 100; // Overflow percentage
                    setAnimationConfig({ isOverflowing: true, overflowPercent });
                    console.log(titleLength, animationConfig);

                    // Set the CSS variable for overflow width
                    spanRef.current.style.setProperty("--overflow-width", `${overflowPercent}%`);
                } else {
                    setAnimationConfig({ isOverflowing: false, overflowPercent: 0 });
                }
            }
        };
        checkOverflow();
    }, [spanRef, currentSong, songs]);

// AUTO PLAY //
    const autoPlay = () => {
        if (currentSong && currentPlaylist?.songs?.length) {
            const currentIndex = currentPlaylist.songs.findIndex(
                (song: Song) => song.id === currentSong.id
            );

            if (isShuffle) {
                // Shuffle: Play a random song
                const randomIndex = Math.floor(Math.random() * currentPlaylist.songs.length);
                setCurrentSong(currentPlaylist.songs[randomIndex]);
            } else if (isRepeat) {
                // Repeat: Restart the current song
                audioRef.current!.currentTime = 0;
                audioRef.current
                    ?.play()
                    .then(() => console.log("Song restarted."))
                    .catch((error) => console.error("Playback failed:", error));
            } else if (isLoop) {
                // Loop on: Play the next song, or loop back to the first
                const nextIndex = (currentIndex + 1) % currentPlaylist.songs.length;
                setCurrentSong(currentPlaylist.songs[nextIndex]);
            } else {
                // Default: Play the next song, or stop if at the end
                const nextIndex = currentIndex + 1;

                if (nextIndex < currentPlaylist.songs.length) {
                    setCurrentSong(currentPlaylist.songs[nextIndex]);
                } else {
                    // Stop playback or reset UI when no more songs
                    setCurrentSong(null); // No more songs to play
                    console.log("End of playlist.");
                }
            }
        }
    };
    useEffect(() => {
        const handleSongEnd = () => {
            playNext();
        };

        const audio = audioRef.current;
        audio?.addEventListener("ended", handleSongEnd);

        return () => {
            audio?.removeEventListener("ended", handleSongEnd);
        };
    }, [autoPlay, currentSong, currentPlaylist]);


    return (
        <div className="flex h-screen bg-black text-white">

            {/* Helmet */}
            <Helmet>
                <title>
                    {isProfile
                        ? "Spotify - cyan"
                        : showPlaylist
                            ? currentPlaylist?.id === 1
                                ? isPlaying && currentSong
                                    ? `${currentSong.title} • ${currentSong.artist}`
                                    : "Spotify - Liked Songs"
                                : isPlaying && currentSong
                                    ? `${currentSong.title} • ${currentSong.artist}`
                                    : `${currentPlaylist?.name} - playlist by cyan | Spotify`
                            : "Spotify Web: Music for everyone"}
                </title>
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
                        <button
                            className="btn btn-circle bg-transparent border-0 h-10 w-10"
                            onClick={handleHome}
                        >
                            <img
                                src={isProfile || showPlaylist ? "/home.svg" : "/home-active.svg"}
                                alt="Home"
                                className="h-10 w-10"
                            />
                        </button>

                        {/* Search Bar */}
                        <input
                            type="text"
                            placeholder="What do you want to play?"
                            className="input w-full max-w-[1000px] text-white rounded-full bg-[#121212]"
                        />
                    </div>

                    {/* Right Side Buttons */}
                    <div className="flex items-center space-x-4 w-1/3 justify-end">
                        <button className="btn btn-ghost">Install App</button>
                        <div className="avatar">
                            <div className="h-12 rounded-full">
                                <img src="/user.jpg" alt="User Avatar" onClick={toggleProfile}/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <aside
                className={`transition-all duration-300 ease-in-out flex flex-col rounded-2xl mt-20 mb-24 overflow-y-auto ${
                    isExpanded
                        ? "w-[20%] overflow-x-visible"
                        : showAlbums
                            ? "w-[6%] overflow-x-hidden"
                            : "w-[5%] overflow-x-hidden"
                } bg-[#121212] m-2 p-4`}
            >
                {/* Navigation */}
                <div className="flex items-center space-x-2 mb-4">
                    <button
                        onClick={toggleExpand}
                        className="flex items-center space-x-2 bg-transparent hover:text-white text-[#e7e9ecbf] transition-all group"
                    >
                        <img
                            src="/yourlibrary.svg"
                            alt="Your Library Icon"
                            className={`h-10 w-10 pl-1 transition-opacity duration-300 ${
                                isExpanded ? "opacity-75 group-hover:opacity-100" : "opacity-100"
                            }`}
                        />
                        {isExpanded && <h2 className="font-semibold text-lg">Your Library</h2>}
                    </button>
                </div>

                <ul className={`space-y-2 transition-all duration-300 ease-in-out mb-4 ${
                    isExpanded ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden"
                }`}>
                    <div className="flex gap-1">
                        <label
                            className={`cursor-pointer px-4 py-2 rounded-2xl text-xs font-bold ${
                                showPlaylists ? "bg-white text-black" : "bg-[#e7e9ec40] text-white"
                            }`}
                        >
                            <input
                                type="radio"
                                name="library-options"
                                className="hidden"
                                checked={showPlaylists}
                                onChange={() => {
                                    setShowPlaylists(true);
                                    setShowAlbums(false);
                                }}
                            />
                            Playlists
                        </label>

                        <label
                            className={`cursor-pointer px-4 py-2 rounded-2xl text-xs font-bold ${
                                showAlbums ? "bg-white text-black" : "bg-[#e7e9ec40] text-white"
                            }`}
                        >
                            <input
                                type="radio"
                                name="library-options"
                                className="hidden"
                                checked={showAlbums}
                                onChange={() => {
                                    setShowPlaylists(false);
                                    setShowAlbums(true);
                                }}
                            />
                            Albums
                        </label>
                    </div>
                </ul>

                {/* Playlists */}
                {showPlaylists && (
                    <div className={`space-y-4 transition-all duration-300 ease-in-out`}>
                        <h3 className={`text-xs uppercase font-semibold text-gray-400 ${!isExpanded && "hidden"}`}>
                            Playlists
                        </h3>
                        <ul className="space-y-4">
                            {playlists.map((playlist) => (
                                <li
                                    key={playlist.id}
                                    className="flex space-x-2 hover:bg-[#e7e9ec1a] cursor-pointer"
                                    onClick={() => handlePlaylistClick(playlist.id)}
                                >
                                    <img
                                        src={playlist.cover}
                                        alt={playlist.name}
                                        className="h-12 w-12 rounded"
                                    />
                                    {isExpanded && (
                                        <span className="text-sm font-bold flex items-center">
                                            {playlist.name}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Albums */}
                {showAlbums && (
                    <div className={`space-y-4 transition-all duration-300 ease-in-out`}>
                        <h3 className={`text-xs uppercase font-semibold text-gray-400 ${!isExpanded && "hidden"}`}>
                            Albums
                        </h3>
                        <ul className="space-y-4">
                            {albums.map((album, index) => (
                                <li
                                    key={index}
                                    className="flex space-x-2"
                                >
                                    <img
                                        src={album.cover}
                                        alt={album.name}
                                        className="h-12 w-12 rounded"
                                    />
                                    {isExpanded && (
                                        <span className="text-sm font-bold flex items-center">
                            {album.name}
                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 mt-20 mb-24">

                {/* Home page */}
                {showHome && (
                    <div className="bg-gradient-to-b from-blue-950 via-blue-950/10 to-[#121212] h-full overflow-y-auto p-6 rounded-2xl">

                        {/* User playlists */}
                        <div className="bg-transparent text-white p-1 space-y-4">

                            {/* Filter Buttons */}
                            <div className="flex space-x-1 mb-4 text-sm">
                                <button
                                    className="px-4 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-600">
                                    All
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-500">
                                    Music
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-500">
                                    Podcasts
                                </button>
                            </div>

                            {/* Playlist Rows */}
                            <div className={`grid ${
                                isNowPlayingVisible && isExpanded
                                    ? "grid-cols-2 gap-6"
                                    : "grid-cols-4 gap-4"
                            }`}>
                                {playlists.map((playlist) => (
                                    <div
                                        key={playlist.id}
                                        className="flex items-center space-x-4 bg-gray-600 rounded-lg hover:bg-gray-500 bg-opacity-50 relative group"
                                        onClick={() => handlePlaylistClick(playlist.id)}
                                    >
                                        <img
                                            src={playlist.cover}
                                            alt={playlist.name}
                                            className="h-20 w-20 rounded-bl-md rounded-tl-md"
                                        />
                                        {/* Play Icon with Animation */}
                                        <img
                                            src="/play-green.svg"
                                            alt="Play"
                                            className="absolute right-2 w-12 h-12 opacity-0 translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer"
                                            onMouseEnter={() => {
                                                setCurrentPlaylist(playlists[playlist.id-1]);
                                            }}
                                            onMouseLeave={() => {
                                                setCurrentPlaylist(null);
                                            }}
                                            onClick={() => {
                                                handlePlayPlaylist(); // Call handlePlayPlaylist
                                            }}
                                        />

                                        <h3 className="font-semibold p-1">{playlist.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Made for user */}
                        <section className="my-6">
                            <h2 className="text-xl font-bold mb-4">Made For You</h2>
                            <div className="grid grid-cols-5 gap-4">
                                {placeholders.map((playlist) => (
                                    <div
                                        key={playlist.id}
                                        className="!p-0 card max-w-max relative group"
                                    >
                                        <div className="relative">
                                            <img
                                                src={playlist.cover}
                                                alt={playlist.name}
                                                className={`${
                                                    isNowPlayingVisible && isExpanded
                                                        ? "h-40 w-40"
                                                        : !isNowPlayingVisible && !isExpanded
                                                            ? "h-72 w-72"
                                                            : "h-56 w-56"
                                                } mb-2 rounded-lg`}
                                            />
                                            {/* Play Icon with Animation */}
                                            <img
                                                src="/play-green.svg"
                                                alt="Play"
                                                className="absolute bottom-4 right-6 w-12 h-12 opacity-0 translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0"
                                            />
                                        </div>
                                        <p className="text-gray-400 text-sm">
                                            {playlist.desc ? (playlist.desc.length > 41 ? `${playlist.desc.slice(0, 41)}...` : playlist.desc) : ""}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recently played */}
                        <section className="mb-6">
                            <h2 className="text-xl font-bold mb-4">Recently Played</h2>
                            <div className="grid grid-cols-5 gap-4">
                                {playlists.map((playlist) => (
                                    <div
                                        key={playlist.id}
                                        className="!p-0 card max-w-max relative group"
                                    >
                                        <div className="relative">
                                            <img
                                                src={playlist.cover}
                                                alt={playlist.name}
                                                className={`${
                                                    isNowPlayingVisible && isExpanded
                                                        ? "h-40 w-40"
                                                        : !isNowPlayingVisible && !isExpanded
                                                            ? "h-72 w-72"
                                                            : "h-56 w-56"
                                                } mb-2 rounded-lg`}
                                            />
                                            {/* Play Icon with Animation */}
                                            <img
                                                src="/play-green.svg"
                                                alt="Play"
                                                className="absolute bottom-4 right-2 w-12 h-12 opacity-0 translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0"
                                            />
                                        </div>
                                        <h3>{playlist.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div> )
                }

                {/*  Playlist View  */}
                {showPlaylist && (
                    <div style={{
                        backgroundImage: `linear-gradient(to bottom, ${bgColor}, ${bgColor}1A, #121212)`,
                    }}
                         className="h-full overflow-y-auto rounded-2xl">

                        {/* Playlist details */}
                        <div className="p-6 flex items-end space-x-6">

                            {/* Playlist Image */}
                            <img
                                src={currentPlaylist?.cover}
                                alt="Playlist Cover"
                                className="h-56 w-56 rounded-md"
                            />

                            {/* Playlist Info */}
                            <div>
                                <p className="uppercase text-sm text-gray-300 mb-2">Public Playlist</p>
                                <h1 className="text-6xl font-bold mb-4">{currentPlaylist?.name}</h1>
                                <p className="text-sm text-gray-300 mb-2">{currentPlaylist?.desc}</p>

                                {/* Creator Info */}
                                <div className="flex items-center space-x-2 text-sm text-gray-300">
                                    <img
                                        src="/user.jpg"
                                        alt="Creator Avatar"
                                        className="h-6 w-6 rounded-full"
                                    />
                                    <span className="text-white font-semibold">cyan</span>
                                    <span>•</span>
                                    <span>{currentPlaylist?.len} songs, {currentPlaylist?.duration}</span>
                                </div>
                            </div>

                        </div>

                        {/* Songs */}
                        <div className={`bg-[#121212] p-4 bg-opacity-20`}>

                            {/* Controls */}
                            <div className="flex flex-row justify-between items-center p-4">

                                {/* Play */}
                                <div className="flex flex-row items-center justify-center gap-2">
                                    <button className="btn btn-circle h-16 w-16"
                                            onClick={handlePlayPlaylist}>
                                        <img
                                            src="/play-green.svg"
                                            alt="Play"
                                            className="h-16 w-16"
                                        />
                                    </button>

                                    {/* More options */}
                                    <button className="btn bg-transparent border-0 h-16 w-16">• • •</button>
                                </div>

                                <div className="flex flex-row gap-1 justify-center items-center">
                                    <p className="text-sm">List</p>
                                    <img
                                        src="/list.svg"
                                        alt="List"
                                        className="h-4 w-4"
                                    />
                                </div>

                            </div>

                            {/* List */}
                            <div className="text-white p-4">
                                {/* Table Header */}
                                <div className={`grid ${
                                    isNowPlayingVisible && isExpanded
                                        ? "grid-cols-[max-content,390px,1fr,max-content] gap-6"
                                        : "grid-cols-[max-content,1fr,1fr,max-content] gap-6"
                                } items-start p-4 border-b border-gray-700 pb-2 mb-2 text-gray-400 text-sm`}>

                                    <span>#</span>
                                    <span>Title</span>
                                    <span>Album</span>
                                    <span className="flex items-center justify-center w-[4ch]">
                                        <img
                                            src="/duration.svg"
                                            alt="Duration"
                                            className="h-4 w-4"
                                        />
                                  </span>
                                </div>

                                {/* Songs List */}
                                <div>
                                    {currentPlaylist?.songs.map((song, index) => (
                                        <div
                                            key={song.id}
                                            className={`grid ${
                                                isNowPlayingVisible && isExpanded
                                                    ? "grid-cols-[max-content,39ch,auto,max-content] gap-6"
                                                    : "grid-cols-[max-content,1fr,1fr,max-content] gap-6"
                                            } items-center p-4 hover:bg-[#e7e9ec1a] rounded`}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                        >
                                            {/* Index, Play Button, or Playing GIF */}
                                            <span>
                                                {isPlaying && currentSong!.id === song.id ? (
                                                    <img
                                                        src="/playing.gif"
                                                        alt="Playing"
                                                        className="h-4 w-4"
                                                    />
                                                ) : hoveredIndex === index ? (
                                                    <img
                                                        src="/play-no-circle.svg"
                                                        alt="Play"
                                                        className="h-4 w-4 cursor-pointer"
                                                        onClick={() => playSong(song.id - 1)}
                                                    />
                                                ) : (
                                                    index + 1
                                                )}
                                            </span>

                                            {/* Title and isExplicit */}
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={song.cover}
                                                    alt={song.title}
                                                    className="h-12 w-12 rounded"
                                                />
                                                <div>
                                                    <p
                                                        className={`font-bold ${
                                                            isPlaying && currentSong!.id === song.id
                                                                ? "text-[#1ed760]"
                                                                : "text-white"
                                                        }`}
                                                    >
                                                        {song.title}
                                                    </p>
                                                    <p className="text-sm text-gray-400">
                                                        {song.isExplicit && (
                                                            <img
                                                                src="/explicit.svg"
                                                                alt="Explicit"
                                                                className="inline-block h-4 w-4 mr-1"
                                                            />
                                                        )}
                                                        {song.artist}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Album */}
                                            <span className="text-gray-400 overflow-x-hidden whitespace-nowrap text-ellipsis">{song.album}</span>

                                            {/* Duration */}
                                            <span className="text-gray-400">{song.duration}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>)
                }

                {/* Profile View */}
                {isProfile && (
                    <div style={{
                        backgroundImage: `linear-gradient(to bottom, #40474f, #40474f1A, #121212)`,
                    }}
                         className="h-full rounded-2xl overflow-y-auto">

                        {/* User details */}
                        <div className="p-6 flex items-end space-x-6 mt-16">

                            {/* User Image */}
                            <img
                                src="/user.jpg"
                                alt="Playlist Cover"
                                className="h-56 w-56 rounded-full"
                            />

                            {/* User Info */}
                            <div>
                                <p className="uppercase text-sm text-gray-300 mb-2">Profile</p>
                                <h1 className="text-6xl font-bold mb-4">cyan</h1>

                                {/* Playlists / Following / Followers */}
                                <div className="flex items-center text-xs text-gray-300 gap-2">
                                    <span className="text-white font-semibold">Spotify UI</span>
                                    <span>•</span>
                                    <span>Made with React, TailwindCSS, DaisyUI, and Canva</span>
                                    <span>•</span>
                                    <span>LE#2 by Ceanne Kolinne G. Arenas</span>
                                </div>
                            </div>
                        </div>

                        {/* Top artists this month */}
                        <div className={`bg-[#121212] p-4 bg-opacity-20`}>

                            {/* 3 dots */}
                            <div className="flex flex-row justify-start items-center">

                                {/* 3 dots */}
                                <button className="btn bg-transparent border-0 h-16 w-16">• • •</button>
                            </div>

                            {/* Prof */}
                            <section className="my-6">
                                <div className="flex flex-col gap-0.5 mb-4">
                                    <h2 className="text-xl font-bold">Submitted as a requirement for</h2>
                                    <p className="text-gray-400 text-sm">ITS122L | Web Systems and Technologies 2</p>
                                </div>
                                <div className="grid grid-cols-5 gap-4">
                                    <div
                                        className="!p-0 card max-w-max relative group"
                                    >
                                        <div className="relative">
                                            <img
                                                src="/jedv.svg"
                                                alt="John Emmanuel Dela Vega"
                                                className={`${
                                                    isNowPlayingVisible && isExpanded
                                                        ? "h-40 w-40"
                                                        : "h-56 w-56"
                                                } mb-2 rounded-full`}
                                            />
                                        </div>
                                        <h3 className="font-semibold text-sm">John Emmanuel Dela Vega</h3>
                                        <p className="text-gray-400 text-xs">Professor</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>)
                }
            </main>

            {/* Now Playing View (right side) */}
            {isNowPlayingVisible && (
                <aside className="max-w-[20%] bg-[#121212] p-4 mt-20 mb-24 rounded-2xl m-2 overflow-y-auto">
                    <h3 className="font-bold mb-4">{currentPlaylist?.name}</h3>

                    {/* Song details */}
                    <div className="card mb-4">
                        <img src={currentSong!.cover} alt={currentSong!.title} className="mb-4 w-full rounded-2xl"/>
                        <h3
                            className="text-lg font-bold mb-2 overflow-hidden whitespace-nowrap relative"
                            style={{maxWidth: '100%'}}
                        >
                        <span
                            ref={spanRef}
                            className={`inline-block ${animationConfig.isOverflowing ? "animate-marquee" : ""}`}
                            style={{
                                whiteSpace: "nowrap",
                                display: "inline-block",
                                animation: animationConfig.isOverflowing
                                    ? `marquee ${10 + animationConfig.overflowPercent / 10}s linear 1s infinite`
                                    : "none",
                                "--overflow-width": `${animationConfig.overflowPercent}%`, // Assign CSS variable
                            } as React.CSSProperties}
                        >
                            {currentSong!.title}
                        </span>
                        </h3>
                        <p className="text-sm text-gray-400">{currentSong!.artist}</p>
                    </div>

                    {/* About the artist */}
                    <div className="bg-gray-500 bg-opacity-20 p-4 rounded-2xl max-h-80 mb-4">
                        <h4 className="text-sm font-bold mb-2">About the Artist</h4>
                        {/* Fetch artist details from the array */}
                        {artists.map((artist) => {
                            // Find the matching artist
                            if (currentSong!.artist.split(",")[0].trim() === artist.name) {
                                // Truncate description if too long
                                const maxLength = 150; // Adjust as needed
                                const truncatedDescription =
                                    artist.description && artist.description.length > maxLength
                                        ? artist.description.substring(0, maxLength) + "..."
                                        : artist.description;

                                return (
                                    <div key={artist.id}>
                                        <img
                                            src={artist.pic}
                                            alt={artist.name}
                                            className="w-16 h-16 rounded-full mb-2"
                                        />
                                        <h2 className="font-bold">{artist.name}</h2>
                                        <div className="flex flex-row items-center gap-2 my-2">
                                            <p className="text-sm text-gray-400">{artist.listeners} Monthly
                                                Listeners</p>
                                            <button
                                                className="btn bg-transparent border-white max-w-max text-xs min-h-6 h-6">Follow
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-400">{truncatedDescription}</p>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Next in queue */}
                    <div className="bg-gray-500 bg-opacity-20 p-4 rounded-2xl">
                        <h4 className="text-sm font-bold mb-2">Next in Queue</h4>
                        {getNextInQueue()}
                    </div>

                </aside>)
            }

            {/*Player controls */}
            <footer className="fixed bottom-0 left-0 w-screen bg-black pb-4 flex items-center justify-evenly">

                {/* Current Song Info / Left side content */}
                <div className="flex items-center w-1/3">
                    <img
                        src={currentSong!.cover}
                        alt="Current Song"
                        className="h-16 rounded mr-4"
                    />
                    <div>
                        <h4 className="text-sm font-bold">{currentSong!.title}</h4>
                        <p className="text-xs text-gray-400">{currentSong!.artist}</p>
                    </div>
                </div>

                {/* Middle content */}
                <div className="flex flex-col w-1/3 items-center">

                    {/* Music Controls */}
                    <div className="flex items-center gap-6">
                        {/* Shuffle */}
                        <button
                            onClick={() => setIsShuffle(!isShuffle)}
                            className={`btn btn-circle bg-transparent border-0 h-4 w-4`}
                        >
                            <img
                                src={isShuffle ? "/shuffle-on.svg" : "/shuffle.svg"}
                                alt="Shuffle"
                                className="h-4 w-4"
                            />
                        </button>


                        {/* Previous */}
                        <button onClick={playPrevious} className="btn btn-circle bg-transparent border-0 h-4 w-4">
                            <img src="/prev.svg" alt="Previous" className="h-4 w-4"/>
                        </button>

                        {/* Play/Pause */}
                        <button onClick={togglePlayPause} className="btn btn-circle bg-transparent border-0 h-8 w-8">
                            <img
                                src={isPlaying ? "/pause.svg" : "/play.svg"}
                                alt={isPlaying ? "Pause" : "Play"}
                                className="h-8 w-8"
                            />
                        </button>

                        {/* Next */}
                        <button onClick={playNext} className="btn btn-circle bg-transparent border-0 h-4 w-4">
                            <img src="/next.svg" alt="Next" className="h-4 w-4"/>
                        </button>

                        {/* Loop */}
                        <button
                            onClick={() => {
                                if (isRepeat) {
                                    setIsRepeat(false); // Turn off repeat
                                    setIsLoop(false); // Turn off loop
                                } else if (isLoop) {
                                    setIsRepeat(true); // Enable repeat
                                } else {
                                    setIsLoop(true); // Enable loop
                                }
                            }}
                            className="btn btn-circle bg-transparent border-0 h-4 w-4"
                        >
                            <img
                                src={
                                    isRepeat
                                        ? "/repeat.svg" // Repeat mode
                                        : isLoop
                                            ? "/loop-on.svg" // Loop mode
                                            : "/loop-off.svg" // Default mode
                                }
                                alt="Loop"
                                className="h-4 w-4"
                            />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full flex flex-row gap-2 items-center">
                        {/* Min Time */}
                        <span className="text-[10px]">{formatTime(currentTime)}</span>

                        <input
                            type="range"
                            min="0:00"
                            max={duration}
                            value={currentTime}
                        onChange={handleSeek}
                        className="range h-1 w-full appearance-none"
                    />
                        <style>{`
                            input[type="range"]::-webkit-slider-thumb {
                                appearance: none;
                                width: 0;
                                height: 0;
                            }
    
                            input[type="range"]::-moz-range-thumb {
                                width: 0;
                                height: 0;
                                border: none;
                            }
    
                            input[type="range"]::-ms-thumb {
                                width: 0;
                                height: 0;
                                border: none;
                            }
    
                            input[type="range"]::-webkit-slider-runnable-track {
                                background: #7b7b7b; /* Track color */
                            }
    
                            input[type="range"]::-moz-range-track {
                                background: #7b7b7b; /* Track color for Firefox */
                            }
                        `}</style>

                        {/* Max Time */}
                        <span className="text-[10px]">{formatTime(duration)}</span>
                </div>
                </div>

                {/* Right Side Controls */}
                <div className="w-1/3 flex flex-row items-center justify-end gap-2 pr-10">

                    {/* Now Playing View */}
                    <button onClick={toggleNowPlaying} className="btn btn-circle bg-transparent border-0 h-6 w-6">
                        <img
                            src={isNowPlayingVisible ? "/nowplaying-on.svg" : "/nowplaying.svg"}
                            alt="Now Playing"
                            className="h-6 w-6"
                        />
                    </button>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2 !pr-0">
                        <button
                            onClick={() => {
                                if (volume > 0) {
                                    setPreviousVolume(volume); // Save the current volume
                                    handleVolumeChange(0); // Mute
                                } else {
                                    handleVolumeChange(previousVolume); // Restore previous volume
                                }
                            }}
                            className="btn btn-circle bg-transparent border-0 h-4 w-4"
                        >
                            <img
                                src={volume === 0 ? "/mute.svg" : "/volume.svg"}
                                alt="Volume"
                                className="h-4 w-4"
                            />
                        </button>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => {
                                const newVolume = parseInt(e.target.value, 10);
                                handleVolumeChange(newVolume);
                            }}
                            className="range h-1 w-max bg-[#7b7b7b]"
                        />
                    </div>
                </div>


                {/* Hidden Audio Element */}
                <audio
                    ref={audioRef}
                    src={currentSong!.file}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                ></audio>
            </footer>

            {/* Popup for No More Tracks */}
            {showPopup && (
                <div className="fixed bottom-28 left-1/2 transform -translate-x-1/2 bg-[#e7e9ec40] text-white text-sm p-2 rounded shadow">
                    No more tracks available!
                </div>
            )}
        </div>
    );
};

export default Home;
