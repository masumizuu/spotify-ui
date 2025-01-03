export class Song {
    constructor(
        public id: number,
        public title: string,
        public artist: string,
        public album: string,
        public duration: string, // Format: "3:45"
        public cover: string,
        public file: string,
        public isExplicit: boolean,
    ) {}
}
