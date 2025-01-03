export class Artist {
    constructor(
        public id: number,
        public name: string,
        public pic: string,
        public description?: string, // optional because popular artists dont have descs
        public listeners?: string
    ) {}
}