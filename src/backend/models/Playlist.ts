import { Song } from './Song';

export class Playlist {
    constructor(
        public id: number,
        public name: string,
        public cover: string,
        public songs: Song[] = [], // Songs in the playlist
        public len: number = 0,
        public desc?: string,
        public duration?: string,
        public bgColor?: string,
    ) {}

    // Find the index of a song based on a callback function
    findIndex(param: (song: Song) => boolean): number {
        return this.songs.findIndex(param);
    }

}