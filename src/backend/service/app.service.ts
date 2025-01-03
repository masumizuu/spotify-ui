import { Artist } from "../models/Artist.ts";
import { Album } from "../models/Album.ts";
import { Radio } from "../models/Radio.ts";

export const popartists: Artist[] = [
    new Artist(1, "Dionela", "/popularartists/dionela.jpg"),
    new Artist(2, "Lady Gaga", "/popularartists/ladygaga.jpg"),
    new Artist(3, "Ariana Grande", "/popularartists/arianagrande.jpg"),
    new Artist(4, "Bruno Mars", "/popularartists/brunomars.jpg"),
    new Artist(5, "Taylor Swift", "/popularartists/taylorswift.jpg"),
];

export const popalbums: Album[] = [
    new Album(1, "Short n' Sweet", "Sabrina Carpenter", "/popularalbums/shortnsweet.jpg"),
    new Album(2, "Freudian", "Daniel Caesar", "/popularalbums/freudian.jpg"),
    new Album(3, "rosie", "ROSÉ", "/popularalbums/rosie.jpg"),
    new Album(4, "HIT ME HARD AND SOFT", "Billie Eilish", "/popularalbums/hitmehardnsoft.jpg"),
    new Album(5, "Marilag", "Dionela", "/popularalbums/marilag.jpg"),
];

export const popradio: Radio[] = [
    new Radio(1, "With Maki, Arthur Nery, Cup of Joe and more", "/popularradio/dionelaradio.jpg"),
    new Radio(2, "With Dionela, Arthur Nery, Up Dharma Down and more", "/popularradio/tjmonterderadio.jpg"),
    new Radio(3, "With gins&melodies, Al James, Shanti Dope and more", "/popularradio/hevabiradio.jpg"),
    new Radio(4, "With Al James, Hev Abi, Shanti Dope and more", "/popularradio/flowgradio.jpg"),
    new Radio(5, "With Katy Perry, One Direction, Adele and more", "/popularradio/brunomarsradio.jpg"),
];