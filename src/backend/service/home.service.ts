import { Playlist } from '../models/Playlist';
import { Song } from '../models/Song';
import { Artist } from "../models/Artist.ts";

// Songs
export const songs: Song[] = [
    // liked songs
    new Song(1, "I Really Want to Stay at Your House", "Rosa Walton, Hallie Coggins", "Cyberpunk 2077: Radio, VOl. 2 (Original Soundtrack)", "4:06", "/albums/cyberpunk2077.jpg", "/likedsongs/irwtsayh.mp3", false),
    new Song(2, "505", "Arctic Monkeys", "Whatever People Say I Am, That's What I'm Not", "4:13", "/albums/fwn.jpg", "/likedsongs/505.mp3", false),
    new Song(3, "Need You Bad", "SIRUP", "CIY", "4:01", "/albums/ciy.jpg", "/likedsongs/nyb.mp3", false),
    new Song(4, "Sunset Glow", "BIGBANG", "Remember", "3:24", "/albums/sunsetglow.jpg", "/likedsongs/sg.mp3", false),
    new Song(5, "Spin The Wheel (from the series Arcane League of Legends)", "Arcane, League of Legends", "Arcane League of Legends: Season 2 (Soundtrack from the Animated Series)", "2:35", "/albums/arcane.jpg", "/likedsongs/stw.mp3", false),

    // timebomb
    new Song(6, "Ma Meilleure Ennemie (from the series Arcane League of Legends)", "Arcane, Stromae, Pomme", "Arcane League of Legends: Season 2 (Soundtrack from the Animated Series)", "2:27", "/albums/arcane.jpg", "/timebomb/mme.mp3", false),
    new Song(7, "Fantastic (from the series Arcane League of Legends)", "Arcane, King Princess", "Arcane League of Legends: Season 2 (Soundtrack from the Animated Series)", "3:04", "/albums/arcane.jpg", "/timebomb/fantastic.mp3", true),
    new Song(8, "The Line (from the series Arcane League of Legends)", "Arcane, Twenty One Pilots", "Arcane League of Legends: Season 2 (Soundtrack from the Animated Series)", "3:12", "/albums/arcane.jpg", "/timebomb/tl.mp3", false),
    new Song(9, "Wasteland (from the series Arcane League of Legends)", "Arcane, Royal & The Serpent", "Arcane League of Legends: Season 2 (Soundtrack from the Animated Series)", "2:41", "/albums/arcane.jpg", "/timebomb/wasteland.mp3", false),
    new Song(10, "To Ashes and Blood (from the series Arcane League of Legends)", "Arcane, Woodkid", "Arcane League of Legends: Season 2 (Soundtrack from the Animated Series)", "4:05", "/albums/arcane.jpg", "/timebomb/tab.mp3", false),
    new Song(11, "Blood Sweat & Tears (from the series Arcane League of Legends)", "Arcane, Sheryl Lee Ralph", "Arcane League of Legends: Season 2 (Soundtrack from the Animated Series)", "3:42", "/albums/arcane.jpg", "/timebomb/bsat.mp3", false),

    // pov: you're a real teenage dirtbag
    new Song(12, "Teenage Dirtbag", "Wheatus", "Wheatus", "4:01", "/albums/wheatus.jpg", "/pov/td.mp3", false),
    new Song(13, "DRUGS", "lil aaron", "GLOING PAIN$", "1:56", "/albums/lilaaron.jpg", "/pov/drugs.mp3", true),
    new Song(14, "Dear Maria, Count Me In", "All Time Low", "So Wrong, It's Right", "3:02", "/albums/alltimelow.jpg", "/pov/dmcmi.mp3", false),
    new Song(15, "Kiwi", "Harry Styles", "Harry Styles", "2:56", "/albums/harrystyles.jpg", "/pov/kiwi.mp3", false),
    new Song(16, "Cooler Than Me", "Ethan Fields", "Cooler Than Me", "2:35", "/albums/ethanfields.jpg", "/pov/ctm.mp3", false),
    new Song(17, "Teenagers", "My Chemical Romance", "The Black Parade", "2:41", "/albums/mcr.jpg", "/pov/teenagers.mp3", false),

    // phantom menace
    new Song(18, "I Miss You", "blink-182", "blink-182", "3:47", "/albums/blink182.jpg", "/phantommenace/imy.mp3", false),
    new Song(19, "I Bet You Look Good On The Dancefloor", "Arctic Monkeys", "Whatever People Say I Am, That's What I'm Not", "2:53", "/albums/am.jpg", "/phantommenace/ibylgotd.mp3", false),
    new Song(20, "Black Sheep - Brie Larson Vocal Version", "Metric, Brie Larson", "Black Sheep (Brie Larson Vocal Version)", "4:54", "/albums/metric.jpg", "/phantommenace/bs.mp3", false),
    new Song(21, "Closer", "Nine Inch Nails", "The Downward Spiral (Deluxe Edition)", "6:13", "/albums/nin.jpg", "/phantommenace/closer.mp3", true),
    new Song(22, "Supermassive Black Hole", "Muse", "Black Holes and Revelations", "3:32", "/albums/muse.jpg", "/phantommenace/sbh.mp3", false),

    // placeholder songs for placeholder playlists
    new Song(23, "Title", "Artist", "Album Name", "3:00", "/album.svg", "/secret.mp3", false),
    new Song(24, "Title", "Artist", "Album Name", "3:00", "/album.svg", "/secret.mp3", false),
    new Song(25, "Title", "Artist", "Album Name", "3:00", "/album.svg", "/secret.mp3", false),
];

// Playlists
export const playlists: Playlist[] = [
    new Playlist(1, "Liked Songs", "/playlists/likedsongs.jpg", songs.filter(song => [1, 2, 3, 4, 5].includes(song.id)), 5, "", "18 min 21 sec", "#3e2c78"),
    new Playlist(2, "timebomb", "/playlists/timebomb.jpg", songs.filter(song => [6, 7, 8, 9, 10, 11].includes(song.id)), 6, "goated show frfr", "19 min 13 sec", "#57897a"),
    new Playlist(3, "pov: you're a real teenage dirtbag", "/playlists/teenagedirtbag.jpg", songs.filter(song => [12, 13, 14, 15, 16, 17].includes(song.id) ), 6, "the teenage dream i missed living in", "17 min 17 sec", "#4d2d4e"),
    new Playlist(4, "phantom menace", "/playlists/phantommenace.jpg", songs.filter(song => [18, 19, 20, 21, 22].includes(song.id)), 5, "fave songs, fave genre/s", "21 min 5 sec", "#18416e"),
];

// Placeholder playlists
export const placeholders: Playlist[] = [
    new Playlist(5, "Discover Weekly", "/madeforyou/discoverweekly.jpg", songs.filter(song => [23, 24, 25].includes(song.id)), 3, "Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked for you. Updates every Monday."),
    new Playlist(6, "Daily Mix 1", "/madeforyou/dailymix1.jpg", songs.filter(song => [23, 24, 25].includes(song.id)), 3, "Lady Gaga, Dua Lipa, Katy Perry and more"),
    new Playlist(7, "Daily Mix 2", "/madeforyou/dailymix2.jpg", songs.filter(song => [23, 24, 25].includes(song.id)), 3, "Lana Del Rey, The Neighbourhood, Hozier and more"),
    new Playlist(8, "Daily Mix 3", "/madeforyou/dailymix3.jpg", songs.filter(song => [23, 24, 25].includes(song.id)), 3, "Eminem, Kendrick Lamar, JID and more"),
    new Playlist(9, "Daily Mix 4", "/madeforyou/dailymix4.jpg", songs.filter(song => [23, 24, 25].includes(song.id)), 3, "The Rolling Stones, The Beatles, Led Zeppelin and more"),
];

// Artists with complete info
export const artists: Artist[] = [
    new Artist(1, "Rosa Walton", "/artists/rosawalton.jpg", "Rosa Walton is one half of the kaleidoscopic, pioneering future-pop duo Let's Eat Grandma.", "1,844,269"),
    new Artist(2, "Arctic Monkeys", "/artists/arcticmonkeys.jpg", "With their nervy and literate indie rock sound, Arctic Monkeys are a respected, adventurous, and successful group that could easily be called Britain's biggest band of the early 21st century. The band arrived with a blast in 2005, assisted by rave reviews and online word of mouth (they were one of the first bands to benefit from social media).", "55,337,796"),
    new Artist(3, "SIRUP", "/artists/sirup.jpg", "Although only two years into his career as “SIRUP”, with a vocal style that seamlessly intertwines rap and singing, packaged in a modern, edgy and innovative style, he is undoubtedly Japan’s fastest rising star in the independent music scene.", "482,053"),
    new Artist(4, "BIGBANG", "/artists/bigbang.jpg", "BIGBANG revealed their unreleased track ’FLOWER ROAD’, a new release by BIGBANG in a year and 3 months since the release of their latest official album, [MADE]. Since the song features all five members of BIGBANG, the release will be a great gift for the fans who will miss the group during their vacancy.", "4,997,875"),
    new Artist(5, "Arcane", "/artists/arcane.jpg", "Riot Games presents Arcane, a new animated streaming television series on Netflix from the world of League of Legends. In the cities of Piltover and Zaun, unrest stirs as inventors and thieves, politicians and crime lords chafe against the constraints of a society torn asunder.", "30,631,307"),
    new Artist(6, "Wheatus", "/artists/wheatus.jpg", "It's hard to believe Wheatus are celebrating the 20th anniversary of their debut album and still-ubiquitous single \"Teenage Dirtbag.\" Yes, that’s right - Dirtbag is no longer a teenager. In honor of this anniversary, Wheatus will release a new and expanded edition of their now classic debut album, in conjunction with a world tour.", "6,754,899"),
    new Artist(7, "lil aaron", "/artists/lilaaron.jpg", "Dubbed ‘one of the music industry best kept (and weirdest) secrets’ by Pigeons and Planes, lil aaron built an intitial enigmatic reputation after he dropped out of high school to tour with scene bands and left Indiana to pen hits for artists including Liam Payne, Blackbear, Big Boi, KIIARA, Kim Petras and Jeremih.", "362,080"),
    new Artist(8, "All Time Low", "/artists/alltimelow.jpg", "Formed in 2003 in the suburbs of Baltimore, Maryland, All Time Low started out as a high school cover band before morphing into a melodic pop-punk act influenced by predecessors like Glory and blink-182.", "7,348,437"),
    new Artist(9, "Harry Styles", "/artists/harrystyles.jpg", "Harry Styles’ third solo album, Harry's House, is breaking new ground for one of the most creative forces in pop music, a star who keeps refusing to stand still. It’s a deeply personal statement from an artist who has never sounded this joyous, this confident, this fearless in facing the future.", "45,290,443"),
    new Artist(10, "Ethan Fields", "/artists/ethanfields.jpg", "The art form of music has interested me for several years. Whether on CDs, iPods, or the current streaming model, I find that rhythms and melodies have a funny way of healing wounds and igniting the passions.", "307,064"),
    new Artist(11, "My Chemical Romance", "/artists/mcr.jpg", "Formed in NJ, My Chemical Romance made its debut in 2002 with the independently released album I Brought You My Bullets, You Brought Me Your Love. The band signed to Reprise Records the following year and made its major label debut with 2004’s Three Cheers for Sweet Revenge, now 3x certified Platinum.", "19,593,189"),
    new Artist(12, "blink-182", "/artists/blink-182.jpg", "Thanks to their hooky, high-energy, often humorous, songs, blink-182 have been one of the most prominent pop-punk bands since gaining mainstream success in the early 2000s. The trio (whose best-known lineup featured bassist/singer Mark Hoppus, guitarist/singer Tom DeLonge, and drummer Travis Baker) stood out from the teen pop and nu-metal that dominated the airwaves, breaking through with their third album, 1999's Enema of the State, and releasing a steady stream of hits bolstered by tongue-in-cheek music videos.", "19,006,766"),
    new Artist(13, "Metric", "/artists/metric.jpg", "In 1998, songwriting & production duo Emily Haines & Jimmy Shaw formed  and left Toronto for NYC in search of like-minded artists. In 2001/2002, they were joined by drummer Joules Scott Key & bassist Joshua Winstead, and found themselves at the center of the city’s burgeoning alt-rock scene alongside bands like LCD Soundsystem, The Strokes, TV On the Radio, Yeah Yeah Yeahs, Interpol and more. Unlike their peers, Metric resisted major label offers, releasing albums that pushed boundaries on their own terms.", "3,421,612"),
    new Artist(14, "Nine Inch Nails", "/artists/nin.jpg", "Pulling the harsh sounds of industrial rock into the mainstream, Trent Reznor and his band Nine Inch Nails became the face of industrial music in the '90s with \"Head Like a Hole,\" \"Closer,\" and \"Hurt\" becoming hits and The Downward Spiral (1994) and The Fragile (1999) topping the charts. Nominated for over a dozen Grammys, NIN won Best Metal Performance awards in 1992 and 1996 for two tracks -- \"Wish\" and \"Happiness in Slavery\" -- from their metallic EP Broken.", "4,105,816"),
    new Artist(15, "Muse", "/artists/muse.jpg", "Muse are Matt Bellamy, Dominic Howard and Chris Wolstenholme. Since forming in 1994, Muse have released nine studio albums, selling over 30 million units worldwide. Their latest album ‘Will of the People” debuted at #1 in multiple territories including, UK (their 7th consecutive #1) , Austria, France, Finland,  Italy and Switzerland and was nominated for a Grammy.", "14,891,418"),
];

